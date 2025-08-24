'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
    createEditor,
    type Descendant,
    Editor,
    Transforms,
    Element as SlateElement,
    Node as SlateNode,
} from 'slate';
import {
    Slate,
    Editable,
    withReact,
    type RenderElementProps,
    type RenderLeafProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Download,
    FileText,
} from 'lucide-react';

type CustomElement = {
    type:
        | 'paragraph'
        | 'heading-one'
        | 'heading-two'
        | 'block-quote'
        | 'bulleted-list'
        | 'numbered-list'
        | 'list-item';
    align?: 'left' | 'center' | 'right';
    children: CustomText[];
};

type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
};

declare module 'slate' {
    interface CustomTypes {
        // eslint-disable-next-line
        // @ts-ignore
        Editor: Editor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
const TEXT_ALIGN_TYPES = ['left', 'center', 'right'] as const;

interface SlateEditorProps {
    initialText?: string;
    onChangeText?: (text: string) => void;
    editorTitle: string;
}

const SlateEditor = ({
    initialText,
    onChangeText,
    editorTitle,
}: SlateEditorProps) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [value, setValue] = useState<Descendant[]>(
        initialText
            ? [{ type: 'paragraph', children: [{ text: initialText }] }]
            : initialValue,
    );

    const renderElement = useCallback((props: RenderElementProps) => {
        const { attributes, children, element } = props;
        const style = { textAlign: element.align };

        switch (element.type) {
            case 'block-quote':
                return (
                    <blockquote
                        style={style}
                        {...attributes}
                        className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                        {children}
                    </blockquote>
                );
            case 'bulleted-list':
                return (
                    <ul
                        style={style}
                        {...attributes}
                        className="list-disc list-inside my-4 space-y-1">
                        {children}
                    </ul>
                );
            case 'heading-one':
                return (
                    <h1
                        style={style}
                        {...attributes}
                        className="font-heading text-2xl font-bold my-4">
                        {children}
                    </h1>
                );
            case 'heading-two':
                return (
                    <h2
                        style={style}
                        {...attributes}
                        className="font-heading text-xl font-semibold my-3">
                        {children}
                    </h2>
                );
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return (
                    <ol
                        style={style}
                        {...attributes}
                        className="list-decimal list-inside my-4 space-y-1">
                        {children}
                    </ol>
                );
            default:
                return (
                    <p
                        style={style}
                        {...attributes}
                        className="my-2 leading-relaxed">
                        {children}
                    </p>
                );
        }
    }, []);

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        // eslint-disable-next-line
        let { attributes, children, leaf } = props;

        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        if (leaf.italic) {
            children = <em>{children}</em>;
        }

        if (leaf.underline) {
            children = <u>{children}</u>;
        }

        return <span {...attributes}>{children}</span>;
    }, []);

    const isBlockActive = (
        editor: Editor,
        format: string,
        blockType: 'type' | 'align' = 'type',
    ) => {
        const { selection } = editor;
        if (!selection) return false;

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    (n as any)[blockType] === format,
            }),
        );

        return !!match;
    };

    const isMarkActive = (editor: Editor, format: keyof CustomText) => {
        const marks = Editor.marks(editor);
        return marks ? (marks as any)[format] === true : false;
    };

    const toggleBlock = (editor: Editor, format: string) => {
        const isActive = isBlockActive(
            editor,
            format,
            TEXT_ALIGN_TYPES.includes(format as any) ? 'align' : 'type',
        );
        const isList = LIST_TYPES.includes(format as any);

        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                LIST_TYPES.includes((n as CustomElement).type as any) &&
                !TEXT_ALIGN_TYPES.includes(format as any),
            split: true,
        });

        let newProperties: Partial<CustomElement>;
        if (TEXT_ALIGN_TYPES.includes(format as any)) {
            newProperties = {
                align: isActive
                    ? undefined
                    : (format as 'left' | 'center' | 'right'),
            };
        } else {
            newProperties = {
                type: isActive
                    ? 'paragraph'
                    : (format as CustomElement['type']),
            };
        }

        Transforms.setNodes<SlateElement>(editor, newProperties);

        if (!isActive && isList) {
            const block: CustomElement = {
                type: 'list-item',
                children: [{ text: '' }],
            };
            Transforms.wrapNodes(editor, block);
        }
    };

    const toggleMark = (editor: Editor, format: keyof CustomText) => {
        const isActive = isMarkActive(editor, format);

        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    };

    const handleExport = () => {
        const text = value.map(n => SlateNode.string(n)).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'scanned-text.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const MARK_BUTTONS = [
        { format: 'bold' as keyof CustomText, icon: Bold },
        { format: 'italic' as keyof CustomText, icon: Italic },
        { format: 'underline' as keyof CustomText, icon: Underline },
    ];

    const BLOCK_BUTTONS = [
        { format: 'heading-one', icon: Heading1 },
        { format: 'heading-two', icon: Heading2 },
        { format: 'bulleted-list', icon: List },
        { format: 'numbered-list', icon: ListOrdered },
        { format: 'block-quote', icon: Quote },
    ];

    const ALIGN_BUTTONS = [
        { format: 'left', icon: AlignLeft },
        { format: 'center', icon: AlignCenter },
        { format: 'right', icon: AlignRight },
    ];

    const ACTION_BUTTONS = [
        { label: 'Export', icon: Download, onClick: () => handleExport() },
    ];

    useEffect(() => {
        if (initialText) {
            Transforms.delete(editor, {
                at: {
                    anchor: Editor.start(editor, []),
                    focus: Editor.end(editor, []),
                },
            });
            Transforms.insertText(editor, initialText);
        }
    }, [initialText, editor]);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {editorTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Toolbar */}
                <div className="border rounded-lg p-2">
                    <div className="flex flex-wrap items-center gap-1">
                        {/* Marks */}
                        {MARK_BUTTONS.map(({ format, icon: Icon }) => (
                            <Button
                                key={format}
                                variant={
                                    isMarkActive(editor, format)
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    toggleMark(editor, format);
                                }}>
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))}

                        <Separator
                            orientation="vertical"
                            className="h-6 mx-1"
                        />

                        {/* Blocks */}
                        {/* {BLOCK_BUTTONS.map(({ format, icon: Icon }) => (
                            <Button
                                key={format}
                                variant={
                                    isBlockActive(editor, format, 'type')
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    toggleBlock(editor, format);
                                }}>
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))} */}

                        <Separator
                            orientation="vertical"
                            className="h-6 mx-1"
                        />

                        {/* Alignment */}
                        {/* {ALIGN_BUTTONS.map(({ format, icon: Icon }) => (
                            <Button
                                key={format}
                                variant={
                                    isBlockActive(editor, format, 'align')
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    toggleBlock(editor, format);
                                }}>
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))} */}

                        <div className="flex-1" />

                        {/* Actions */}
                        {ACTION_BUTTONS.map(
                            ({ label, icon: Icon, onClick }) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    size="sm"
                                    onClick={onClick}>
                                    <Icon className="h-4 w-4 mr-1" /> {label}
                                </Button>
                            ),
                        )}
                    </div>
                </div>

                {/* Editor */}
                <div className="border rounded-lg min-h-96">
                    <Slate
                        editor={editor}
                        initialValue={value}
                        onValueChange={newValue => {
                            setValue(newValue);
                            if (onChangeText) {
                                const plainText = newValue
                                    .map(n => SlateNode.string(n))
                                    .join('\n');
                                onChangeText(plainText);
                            }
                        }}>
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Scanned results will be shown here"
                            className="p-4 min-h-96 focus:outline-none"
                            spellCheck
                            autoFocus
                        />
                    </Slate>
                </div>
            </CardContent>
        </Card>
    );
};

export default SlateEditor;
