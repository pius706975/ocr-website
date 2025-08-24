import { Card, CardContent } from "@/components/ui/card";

const Instruction = () => {
    return (
        <Card>
            <CardContent>
                <div className="space-y-3">
                    <h3 className="font-heading font-semibold">How to scan:</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">
                                    1
                                </span>
                            </div>
                            <span>
                                Position text clearly within the camera frame or
                                upload a clear image
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">
                                    2
                                </span>
                            </div>
                            <span>
                                Ensure good lighting and avoid shadows or glare
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">
                                    3
                                </span>
                            </div>
                            <span>
                                Click capture to scan and extract text
                                automatically
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Instruction;
