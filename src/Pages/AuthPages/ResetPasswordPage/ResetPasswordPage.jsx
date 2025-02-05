import {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPaperPlane, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsSubmitted(true);
            setSubmitError('');
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-65px)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Reset your password
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {!isSubmitted ? (
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className={`block w-full pl-10 pr-3 py-2 border ${
                                            errors.email ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        placeholder="you@domain.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600" id="email-error">
                                        <FaExclamationCircle className="inline mr-1" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <FaPaperPlane className="mr-2 h-5 w-5" />
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                            <h3 className="mt-2 text-xl font-medium text-gray-900">Reset link sent</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Check your email for the password reset link.
                            </p>
                        </div>
                    )}

                    {submitError && (
                        <div className="mt-4 text-center text-sm text-red-600">
                            <FaExclamationCircle className="inline mr-1" />
                            {submitError}
                        </div>
                    )}

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Remember your password? Click{' '}
                                <Link to="/sign-in" className="font-medium italic text-indigo-600 hover:text-indigo-500">
                                    Sign In
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
