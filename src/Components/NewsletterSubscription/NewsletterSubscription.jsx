import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaCheck } from 'react-icons/fa';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Subscribed email:', email);
        setIsSubscribed(true);
        setEmail('');
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    return (
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay Updated with Our Newsletter
                    </h2>
                    <p className="text-lg text-purple-100 mb-8">
                        Get the latest discussions, announcements, and community highlights delivered to your inbox.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            {isSubscribed ? (
                                <>
                                    <FaCheck className="mr-2" />
                                    Subscribed!
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane className="mr-2" />
                                    Subscribe
                                </>
                            )}
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-purple-200">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSubscription;
