import { useState, useCallback } from 'react';
import { FaSearch, FaRegLightbulb, FaRegComments, FaRegChartBar } from 'react-icons/fa';

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('topics');

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        // Here you would typically handle the search logic
    }, [searchQuery]);

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const tabContent = {
        topics: {
            icon: FaRegLightbulb,
            title: 'Explore Topics',
            description: 'Discover a wide range of discussions on various subjects.',
        },
        discussions: {
            icon: FaRegComments,
            title: 'Join Discussions',
            description: 'Engage in meaningful conversations with like-minded individuals.',
        },
        insights: {
            icon: FaRegChartBar,
            title: 'Gain Insights',
            description: 'Learn from experts and share your own knowledge.',
        },
    };

    return (
        <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Discover, Discuss, Develop
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-purple-100">
                        Your gateway to insightful conversations and knowledge sharing
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 mb-12">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search topics, questions, or discussions..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-5 py-4 rounded-full text-gray-900 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-opacity-100 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200"
                        >
                            <FaSearch className="text-white" />
                        </button>
                    </form>
                </div>

                <div className="flex justify-center space-x-4 mb-12">
                    {Object.keys(tabContent).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                                activeTab === tab
                                    ? 'bg-white text-purple-700'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(tabContent).map(([key, { icon: Icon, title, description }]) => (
                        <div
                            key={key}
                            className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 transition-all duration-300 ${
                                activeTab === key ? 'ring-4 ring-purple-400 ring-opacity-50' : ''
                            }`}
                        >
                            <Icon className="text-4xl mb-4 text-purple-300" />
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-purple-100">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
