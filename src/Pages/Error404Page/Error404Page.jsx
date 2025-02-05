import { FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';

const Error404 = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
                <div className="text-center">
                    <FaExclamationCircle className="mx-auto h-24 w-24 text-indigo-500 animate-pulse" />
                    <h1 className="mt-6 text-5xl font-extrabold text-gray-900 tracking-tight">404</h1>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">Page Not Found</h2>
                    <p className="mt-4 text-lg text-gray-600">Oops! It seems you have ventured into uncharted territory.</p>
                </div>
                <div className="mt-10">
                    <button
                        onClick={handleGoBack}
                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FaArrowLeft className="mr-2" />
                        Go back
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-base text-gray-500">
                        Lost? Do not worry, it happens to the best of us.
                    </p>
                    <a
                        href="/"
                        className="mt-2 inline-block text-indigo-600 hover:text-indigo-500 font-medium transition duration-300 ease-in-out"
                    >
                        Return to homepage
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Error404;
