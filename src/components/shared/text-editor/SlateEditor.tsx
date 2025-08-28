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
    Download,
    FileText,
} from 'lucide-react';

type CustomElement = {
    type: 'paragraph' | 'list-item';
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
    const [value, setValue] = useState<Descendant[]>(initialValue);

    useEffect(() => {
        if (initialText && initialText.trim() !== '') {
            const previousSelection = editor.selection;

            Transforms.delete(editor, {
                at: {
                    anchor: Editor.start(editor, []),
                    focus: Editor.end(editor, []),
                },
            });

            const paragraphs = initialText.split('\n');

            paragraphs.forEach((paragraphText, index) => {
                if (index > 0) {
                    Transforms.insertNodes(editor, {
                        type: 'paragraph',
                        children: [{ text: '' }],
                    });
                }

                Transforms.insertText(editor, paragraphText);
            });

            if (previousSelection) {
                Transforms.select(editor, previousSelection);
            } else {
                Transforms.select(editor, Editor.end(editor, []));
            }
        }
    }, [initialText, editor]);

    const renderElement = useCallback((props: RenderElementProps) => {
        const { attributes, children, element } = props;
        const style = { textAlign: element.align };

        switch (element.type) {
            case 'list-item':
                return <li {...attributes}>{children}</li>;
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

    const ALIGN_BUTTONS = [
        { format: 'left', icon: AlignLeft },
        { format: 'center', icon: AlignCenter },
        { format: 'right', icon: AlignRight },
    ];

    const ACTION_BUTTONS = [
        { label: 'Export', icon: Download, onClick: () => handleExport() },
    ];

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
                                type="button"
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

                        <Separator
                            orientation="vertical"
                            className="h-6 mx-1"
                        />

                        {/* Alignment */}
                        {ALIGN_BUTTONS.map(({ format, icon: Icon }) => (
                            <Button
                                key={format}
                                variant={
                                    isBlockActive(editor, format, 'align')
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                type="button"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    toggleBlock(editor, format);
                                }}>
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))}

                        <div className="flex-1" />

                        {/* Actions */}
                        {ACTION_BUTTONS.map(
                            ({ label, icon: Icon, onClick }) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    size="sm"
                                    type="button"
                                    onClick={onClick}>
                                    <Icon className="h-4 w-4 mr-1" /> {label}
                                </Button>
                            ),
                        )}
                    </div>
                </div>

                <div className="border rounded-lg flex-1 flex flex-col min-h-0">
                    <Slate
                        editor={editor}
                        initialValue={initialValue}
                        onChange={newValue => {
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
                            className="p-4 flex-1 overflow-y-auto focus:outline-none min-h-0"
                            style={{
                                maxHeight: '450px',
                                minHeight: '450px',
                            }}
                            spellCheck
                            autoFocus
                            onKeyDown={event => {
                                if (event.key === 'Enter' && !event.shiftKey) {
                                    event.preventDefault();
                                    Transforms.splitNodes(editor, {
                                        always: true,
                                    });
                                    Transforms.setNodes(editor, {
                                        type: 'paragraph',
                                    });
                                }
                            }}
                        />
                    </Slate>
                </div>
            </CardContent>
        </Card>
    );
};

export default SlateEditor;
