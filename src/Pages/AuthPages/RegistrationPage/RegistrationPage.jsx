import {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import {uploadImageToImageServerAndGetUrl} from '../../../SharedUtilities/SharedUtilities.jsx';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../Providers/AuthContext.jsx";


const Registration = () => {

    const {signUpNewUser, signInWithGoogle} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [profilePicture, setProfilePicture] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [generatedPhotoUrl, setGeneratedPhotoUrl] = useState(null);
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);

            const url = await uploadImageToImageServerAndGetUrl(file);
            // console.log(url);
            setGeneratedPhotoUrl(url);

            setUploadedFile({
                name: file.name,
                size: (file.size / 1024).toFixed(2) // Converting the file size into KB
            });
        }
    };


    const onSubmit = async (data) => {
        const name = data.fullName;
        const photoUrl = generatedPhotoUrl;
        const email = data.email;
        const password = data.password;
        // console.log(name, photoUrl, email, password);

        /* SIGNING UP THROUGH FIREBASE */
        await signUpNewUser(name, photoUrl, email, password);
        navigate('/sign-in');
    };


    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        navigate('/');
    };


    return (
        <div className="min-h-[calc(100vh-65px)] bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Register Your Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">FullName</label>
                                <div className="relative">
                                    <input
                                        id="fullName"
                                        type="text"
                                        {...register('fullName', {required: 'Full name is required'})}
                                        className="block w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                        placeholder="Muster Mann"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-4 w-4 text-gray-400"/>
                                    </div>
                                </div>
                                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className="block w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                        placeholder="you@domain.com"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-4 w-4 text-gray-400"/>
                                    </div>
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', {
                                            required: 'Password is required',
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                                                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character like @ $ ! % * ? & #.',
                                            },
                                        })}
                                        className="block w-full h-10 pl-10 pr-10 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                        placeholder="**********"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-gray-400"/>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-4 w-4 text-gray-400"/>
                                        ) : (
                                            <FaEye className="h-4 w-4 text-gray-400"/>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword"
                                       className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: (value) => value === watch('password') || 'Passwords do not match',
                                        })}
                                        className="block w-full h-10 pl-10 pr-10 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                        placeholder="**********"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-gray-400"/>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="h-4 w-4 text-gray-400"/>
                                        ) : (
                                            <FaEye className="h-4 w-4 text-gray-400"/>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword &&
                                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Picture
                            </label>
                            <div className="flex items-center">
                                {profilePicture ? (
                                    <img src={profilePicture || "/placeholder.svg"} alt="Profile"
                                         className="h-14 w-14 rounded-full object-cover"/>
                                ) : (
                                    <div
                                        className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <FaUser className="h-6 w-6 text-gray-400"/>
                                    </div>
                                )}
                                <div className="ml-5">
                                    <label htmlFor="file-upload"
                                           className="cursor-pointer bg-white py-2 px-20 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span>Upload</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    {uploadedFile && (
                                        <p className="mt-2 text-xs text-gray-500">
                                            {uploadedFile.name} ({uploadedFile.size} KB)
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                {...register('terms', {required: 'You must accept the terms and conditions'})}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I accept the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and
                                Conditions</a>
                            </label>
                        </div>
                        {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms.message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or alternatively</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FaGoogle className="h-5 w-5 text-red-500 mr-2"/>
                                Sign up with Google
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account? Click{' '}
                            <a href="/sign-in" className="font-medium italic text-indigo-600 hover:text-indigo-500">
                                Sign In
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Registration;
