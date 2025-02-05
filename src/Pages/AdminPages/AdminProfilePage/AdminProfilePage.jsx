import {useState, useEffect, useContext} from 'react';
import { FaEnvelope, FaEdit, FaShieldAlt, FaCalendarAlt, FaTags, FaPlus } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../Providers/AuthContext.jsx";
import moment from 'moment';
import DataContext from "../../../Providers/DataContext.jsx";


const AdminProfilePage = () => {

    const {user: registeredUser} = useContext(AuthContext)
    const {allTags, saveTagsToServer, allCategories, saveCategoriesToServer} = useContext(DataContext)
    const [admin, setAdmin] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchAdminData = async () => {
            const adminData = {
                fullName: registeredUser?.displayName || 'Loading...',
                email: registeredUser?.email || 'Loading...',
                avatar: registeredUser?.photoURL || 'https://i.pravatar.cc/300',
                role: registeredUser?.role || 'Loading...',
                membershipType: registeredUser?.membershipType || 'Loading...',
                joinDate: registeredUser?.joinDate || '2000-01-01T00:00:00.000Z'
            };
            setAdmin(adminData);
        };


        fetchAdminData().then();
    }, [registeredUser]);


    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };


    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (newCategory) {

            const categoriesArray = newCategory.split(',')
                .map(category => category.trim()) // Trim spaces around each word
                .filter(category => category.length > 0) // Remove empty strings
                .map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()); // Capitalize first letter

            await saveCategoriesToServer(categoriesArray);
        }
        setNewCategory('');
    };


    const handleNewTagChange = (e) => {
        setNewTag(e.target.value);
    };


    const handleAddTag = async (e) => {
        e.preventDefault();
        if (newTag) {

            const tagsArray = newTag.split(',')
                .map(tag => tag.trim()) // Trim spaces around each word
                .filter(tag => tag.length > 0) // Remove empty strings
                .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()); // Capitalize first letter

            await saveTagsToServer(tagsArray);
        }
        setNewTag('');
    };


    const handleUpdateProfile = () => {
        navigate('/admin-dashboard/admin-profile/update-profile');
    };


    if (!admin) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32 md:h-48"></div>
                <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="relative -mt-16 sm:-mt-24">
                        <img
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg object-cover"
                            src={admin.avatar || "/placeholder.svg"}
                            alt={admin.fullName}
                        />
                    </div>
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-end sm:space-x-5">
                        <div className="sm:flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 truncate">{admin.fullName}</h1>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                                <FaShieldAlt className="mr-2 text-indigo-500" />
                                {admin?.role === 'admin' ? 'Admin' : admin?.role === 'user' ? 'User' : admin?.role === 'pending' ? 'User' : 'Loading...' }
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-0">
                            <button
                                onClick={handleUpdateProfile}
                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FaEdit className="mr-2" />
                                Update Profile
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                            <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">Email:</span>
                            <span className="ml-2 text-sm text-gray-900">{admin.email}</span>
                        </div>
                        <div className="flex items-center">
                            <FaCalendarAlt className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">Joined:</span>
                            <span className="ml-2 text-sm text-gray-900">{moment(admin.joinDate).format('Do MMMM YYYY')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaTags className="mr-2 text-indigo-500" />
                    Manage Categories
                </h2>
                <form onSubmit={handleAddCategory} className="mb-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleNewCategoryChange}
                            placeholder="Enter new category(ies) separated by comma(s)"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <FaPlus className="inline-block mr-1" />
                            Add Category
                        </button>
                    </div>
                </form>
                <div className="flex flex-wrap gap-2">
                    {allCategories.map((category, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaTags className="mr-2 text-indigo-500" />
                    Manage Tags
                </h2>
                <form onSubmit={handleAddTag} className="mb-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={newTag}
                            onChange={handleNewTagChange}
                            placeholder="Enter new tag(s) separated by comma(s)"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <FaPlus className="inline-block mr-1" />
                            Add Tag
                        </button>
                    </div>
                </form>
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default AdminProfilePage;
