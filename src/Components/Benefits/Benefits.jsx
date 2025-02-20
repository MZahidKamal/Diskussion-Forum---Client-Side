import { FaDiscourse, FaUsers, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Benefits = () => {

    const navigate = useNavigate();


    const handleGetStarted = () => {
        navigate('/sign-in');
    };


    const benefits = [
        {
            icon: FaDiscourse,
            title: "Engage in Meaningful Discussions",
            description: "Join our vibrant community where ideas flourish and knowledge flows freely. Share your thoughts, ask questions, and participate in enriching conversations that matter.",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1470&auto=format&fit=crop",
            isReversed: false,
            bgColor: "from-blue-500/10 to-purple-500/10",
            iconColor: "text-blue-600"
        },
        {
            icon: FaUsers,
            title: "Connect with Like-minded People",
            description: "Build valuable connections with professionals, enthusiasts, and experts from various fields. Our platform brings together diverse perspectives and experiences.",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop",
            isReversed: true,
            bgColor: "from-purple-500/10 to-pink-500/10",
            iconColor: "text-purple-600"
        },
        {
            icon: FaLightbulb,
            title: "Grow Your Knowledge",
            description: "Access quality content, expert insights, and valuable resources. Whether you're a beginner or an expert, there's always something new to learn and discover.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
            isReversed: false,
            bgColor: "from-pink-500/10 to-rose-500/10",
            iconColor: "text-pink-600"
        }
    ];


    return (
        <section id={'why-us'} className="py-24 bg-gradient-to-b from-gray-50 via-purple-50/30 to-white relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,white_50%,transparent_100%)] opacity-70"></div>
            <div className="container mx-auto px-4 relative">
                <div className="max-w-2xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Diskussion</span>?
                    </h2>
                    <p className="text-lg text-gray-600">Discover the features that make our platform unique</p>
                </div>

                <div className="space-y-32">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${benefit.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
                        >
                            <div className="w-full md:w-1/2 relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.bgColor} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}></div>
                                <div className="relative">
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className="rounded-2xl shadow-2xl w-full h-[400px] object-cover transform group-hover:scale-[1.02] transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 space-y-6">
                                <div className={`w-16 h-16 rounded-full ${benefit.bgColor} bg-gradient-to-r flex items-center justify-center mb-6`}>
                                    <benefit.icon className={`w-8 h-8 ${benefit.iconColor}`} />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                                    {benefit.title}
                                </h3>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>

                                <div className={`flex items-center space-x-4 ${benefit.isReversed ? 'justify-end' : ''}`}>
                                    <div className={`w-20 h-1 bg-gradient-to-r ${benefit.bgColor}`}></div>
                                    <button
                                        onClick={handleGetStarted}
                                        className={`px-6 py-2 rounded-full bg-gradient-to-r ${benefit.bgColor} ${benefit.iconColor} font-semibold hover:shadow-lg transition-all duration-300`}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
