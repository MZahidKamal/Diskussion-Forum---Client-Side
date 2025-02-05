import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHeading, FaPen, FaTag, FaThumbsUp, FaThumbsDown, FaInfoCircle, FaPlus } from 'react-icons/fa';
import DataContext from "../../../Providers/DataContext.jsx";
import AuthContext from "../../../Providers/AuthContext.jsx";


const AddPostPage = () => {

    const {user: registeredUser} = useContext(AuthContext)
    const {allTags, saveTagsToServer, allCategories, saveCategoriesToServer, saveNewPostToServer, fetchAllMyPostsFromServer} = useContext(DataContext)
    const [user, setUser] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newCategories, setNewCategories] = useState('');
    const [newTags, setNewTags] = useState('');
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        // Simulating API call to fetch user data and post count
        const fetchUserData = async () => {
            const userData = {
                name: registeredUser?.displayName || 'Loading..',
                email: registeredUser?.email || 'Loading..',
                avatar: registeredUser?.photoURL || 'https://i.pravatar.cc/150?img=3',
            };
            setUser(userData);
            setPostCount(4); // TODO: Bring real post count here
        };

        fetchUserData().then();
    }, [registeredUser]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        const newPost = {
            title: title,
            description: description,
            publishedOn: new Date().toISOString(),
            categoryIds: selectedCategories,
            tagIds: selectedTags,
            authorId: registeredUser?._id,
            stats: {
                viewCounts: 0,
                likeCounts: 0,      //TODO: Remove likeCounts from the whole project.
                commentCounts: 0,
                upVoteCounts: 0,
                downVoteCounts: 0
            },
            commentIds: [],
            status: "published"
        }

        // console.log('Form submitted:', newPost);
        await saveNewPostToServer(newPost);


        // Reset form fields
        setTitle('');
        setDescription('');

        setSelectedCategories([]);
        setSelectedTags([]);

        setNewCategories('');
        setNewTags('');

        await fetchAllMyPostsFromServer({
            userId: registeredUser?._id,
            userEmail: registeredUser?.email
        });

        if (registeredUser?.role === 'admin') navigate('/admin-dashboard/my-posts');
        else navigate('/user-dashboard/my-posts');
    };


    const handleBecomeMember = () => {
        navigate('/user-dashboard/manage-membership');
    };


    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(categoryId)
                ? prevCategories.filter(id => id !== categoryId)
                : [...prevCategories, categoryId]
        );
    };


    const handleNewCategoriesChange = (e) => {
        setNewCategories(e.target.value);
    };


    const handleAddNewCategories = async (e) => {
        e.preventDefault();
        if (newCategories){
            const categoriesArray = newCategories.split(',').map(category => category.trim()).filter(category => category !== '');
            await saveCategoriesToServer(categoriesArray);
            setNewCategories('')
        }
    };


    const handleTagToggle = (tagId) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tagId)
                ? prevTags.filter(id => id !== tagId)
                : [...prevTags, tagId]
        );
    };


    const handleNewTagsChange = (e) => {
        setNewTags(e.target.value);
    };


    const handleAddNewTags = async (e) => {
        e.preventDefault();
        if (newTags){
            const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            await saveTagsToServer(tagsArray);
            setNewTags('');
        }
    };


    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto">
            {postCount >= 5 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <FaInfoCircle className="text-yellow-500 text-4xl mx-auto mb-4" />
                    <p className="text-lg mb-4">You have reached the maximum number of posts for a normal user.</p>
                    <button
                        onClick={handleBecomeMember}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Become a Member
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author Information</label>
                        <div className="flex items-center space-x-4">
                            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                    <FaUser className="mr-2" />
                                    {user.name}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <FaEnvelope className="mr-2" />
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaHeading className="inline mr-2" />
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaPen className="inline mr-2" />
                            Post Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        ></textarea>
                    </div>


                    <div className="mb-6">
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <FaTag className="inline mr-2" />
                            Select Categories
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {allCategories.map(category => (
                                <div key={category?._id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category?._id}`}
                                        checked={selectedCategories.includes(category?._id)}
                                        onChange={() => handleCategoryToggle(category?._id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`category-${category?._id}`} className="text-sm text-gray-700">
                                        {category?.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="newTags" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaPlus className="inline mr-2" />
                            Add New Category(ies) (comma-separated)
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="newCategories"
                                value={newCategories}
                                onChange={handleNewCategoriesChange}
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g. AI, Machine Learning, Data Science"
                            />
                            <button
                                type="button"
                                onClick={handleAddNewCategories}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Add
                            </button>
                        </div>
                    </div>


                    <div className="mb-6">
                        <label className="block text-xl font-medium text-gray-700 my-2">
                            <FaTag className="inline mr-2" />
                            Select Tags
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {allTags.map(tag => (
                                <div key={tag?._id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`tag-${tag?._id}`}
                                        checked={selectedTags.includes(tag?._id)}
                                        onChange={() => handleTagToggle(tag?._id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`tag-${tag?._id}`} className="text-sm text-gray-700">
                                        {tag.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="newTags" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaPlus className="inline mr-2" />
                            Add New Tag(s) (comma-separated)
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="newTags"
                                value={newTags}
                                onChange={handleNewTagsChange}
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g. AI, Machine Learning, Data Science"
                            />
                            <button
                                type="button"
                                onClick={handleAddNewTags}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="flex items-center">
                            <FaThumbsUp className="text-green-500 mr-2" />
                            <span className="text-sm text-gray-600">UpVotes: 0</span>
                        </div>
                        <div className="flex items-center">
                            <FaThumbsDown className="text-red-500 mr-2" />
                            <span className="text-sm text-gray-600">DownVotes: 0</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Submit Post
                    </button>
                </form>
            )}
        </div>
    );
};


export default AddPostPage;
