import {useContext, useState} from 'react';
import { FaHome, FaSearch, FaBell, FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import {IoIosCheckboxOutline, IoMdAdd, IoMdContract} from 'react-icons/io';
import {useNavigate, Link, useLocation} from "react-router-dom";
import AuthContext from "../../Providers/AuthContext.jsx";
import DataContext from "../../Providers/DataContext.jsx";


const Navbar = () => {

    const {user, signOutCurrentUser} = useContext(AuthContext);
    const {unreadAnnouncements} = useContext(DataContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const currentLocation = useLocation();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    const handleNewPostClick = () => {
        if (user && user?.role === 'admin') {
            navigate("/admin-dashboard/create-new-post");
        }
        else if (user && user?.role === 'user') {
            navigate("/user-dashboard/create-new-post");
        }
        else {
            navigate("/sign-in");
        }
    }


    const handleNotificationClick = async () => {
        if (currentLocation.pathname === '/') {
            const target = document.getElementById('latest-announcements');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            await navigate('/');
            setTimeout(() => {
                const target = document.getElementById('latest-announcements');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    };


    const handleDashboardClick = () => {
        if (user && user?.role === 'admin') {
            navigate("/admin-dashboard");
        }
        else if (user && user?.role === 'user') {
            navigate("/user-dashboard");
        }
        else {
            navigate("/sign-in");
        }
    }


    const handleLogout = async () => {
        await signOutCurrentUser();
        navigate('/');
    };


    return (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link 
                                to={{pathname:"/"}}
                                onClick={handleLogoClick}
                                className="text-5xl font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                                Diskussion
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-5">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-gray-700">
                            <FaHome className="h-5 w-5 text-blue-500" />
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-sm"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                        <button
                            onClick={() => handleNewPostClick()}
                            className="text-gray-700 w-32 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center space-x-2"
                        >
                            <IoMdAdd className="h-4 w-4 text-green-500" />
                            <span>New Post</span>
                        </button>
                        <button
                            className="text-gray-500 hover:text-gray-700 relative"
                            onClick={handleNotificationClick}>
                            <FaBell className="h-8 w-8 text-yellow-500" />
                            {user && unreadAnnouncements?.length > 0 &&
                                <div className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs ring-2 ring-white">
                                    {unreadAnnouncements?.length}
                                </div>
                            }
                        </button>
                        {user ? (
                            <div className="relative group">
                                <button
                                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src={user?.photoURL}
                                        alt="User profile"
                                    />
                                </button>
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-300 z-50">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                                        {user?.displayName}
                                    </div>
                                    <button
                                        onClick={() => handleDashboardClick()}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                                    >
                                        <FaTachometerAlt className="inline-block mr-2 text-gray-400" />
                                        {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                                    >
                                        <FaSignOutAlt className="inline-block mr-2 text-gray-400" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative group">
                                <button
                                    className="bg-blue-500 text-white w-24 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
                                >
                                    Join Us
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <Link
                                        to={{pathname: "/registration"}}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Registration
                                    </Link>
                                    <Link
                                        to={{pathname: "/sign-in"}}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 p-2 rounded-md"
                        >
                            {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-5 pt-2 pb-3 space-y-1">
                        <button
                            onClick={() => navigate('/')}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Home
                        </button>
                        <div className="relative my-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-sm"
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                        </div>
                        <button
                            onClick={() => handleNewPostClick()}
                            className="w-full text-gray-700 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center space-x-2"
                        >
                            <IoMdAdd className="h-4 w-4 text-green-500"/>
                            <span>New Post</span>
                        </button>
                        <button
                            onClick={handleNotificationClick}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Notifications
                        </button>
                        {user ? (
                            <>
                                <button
                                    onClick={() => handleDashboardClick()}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={{pathname: "/registration"}}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Registration
                                </Link>
                                <Link
                                    to={{pathname: "/sign-in"}}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};


export default Navbar;
