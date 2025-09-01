const Header = () => {
    return (
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="sm:text-4xl text-xl font-heading font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Text Diff Checker
                </h1>
            </div>
            <p className="text-muted-foreground sm:text-lg max-w-2xl mx-auto">
                Compare two texts and highlight the differences between them
                with our advanced diff checker tool.
            </p>
        </header>
    );
};

export default Header;
