import Header from './components/Header';
import Diff from './components/Diff';

const TextDiffPage = () => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <Header />

                <Diff />
            </div>
        </div>
    );
};

export default TextDiffPage;
