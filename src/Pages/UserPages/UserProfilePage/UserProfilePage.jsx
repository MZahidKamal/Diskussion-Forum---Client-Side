import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from "../../../Providers/AuthContext.jsx";
import moment from 'moment';


const UserProfilePage = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [latestPosts, setLatestPosts] = useState([]);
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        // Simulating API call to fetch user data
        const fetchUserData = async () => {
            const userData = {
                fullName: registeredUser?.displayName || 'Loading...',
                email: registeredUser?.email || 'Loading...',
                avatar: registeredUser?.photoURL || 'https://i.pravatar.cc/300',
                role: registeredUser?.role || 'Loading...',
                membershipType: registeredUser?.membershipType || 'Loading...',
                joinDate: registeredUser?.joinDate || '2000-01-01T00:00:00.000Z'
            };
            setUser(userData);
        };

        const fetchLatestPosts = async () => {
            const posts = [
                {
                    id: 1,
                    title: 'The Future of AI in Web Development',
                    excerpt: 'Exploring the potential impact of artificial intelligence on various industries.',
                    image: 'https://edgroom-blogs.s3.ap-south-1.amazonaws.com/202310081145326493914_future_of_artificial_intelligence.jpg',
                    commentCount: 15,
                    likeCount: 32,
                    viewCount: 1200,
                    upvotes: 45,
                    downvotes: 3,
                    date: '2023-05-15',
                },
                {
                    id: 2,
                    title: 'Responsive Web Design Trends',
                    excerpt: 'Latest trends and best practices in responsive web design for modern websites.',
                    image: 'https://edgroom-blogs.s3.ap-south-1.amazonaws.com/202310081145326493914_future_of_artificial_intelligence.jpg',
                    commentCount: 8,
                    likeCount: 24,
                    viewCount: 980,
                    upvotes: 30,
                    downvotes: 2,
                    date: '2023-05-14',
                },
                {
                    id: 3,
                    title: 'Sustainable Business Practices',
                    excerpt: 'How companies are adopting eco-friendly approaches to business operations.',
                    image: 'https://edgroom-blogs.s3.ap-south-1.amazonaws.com/202310081145326493914_future_of_artificial_intelligence.jpg',
                    commentCount: 12,
                    likeCount: 41,
                    viewCount: 1500,
                    upvotes: 52,
                    downvotes: 5,
                    date: '2023-05-13',
                },
            ];
            setLatestPosts(posts);
        };

        fetchUserData().then();
        fetchLatestPosts().then();
    }, [registeredUser]);


    const handleUpdateProfile = () => {
        navigate('/user-dashboard/user-profile/update-profile');
    };


    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32 sm:h-48"></div>
                <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="relative -mt-16 sm:-mt-24">
                        <img
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg object-cover"
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.fullName}
                        />
                    </div>
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-end sm:space-x-5">
                        <div className="sm:flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 truncate">{user.fullName}</h1>
                            <p className="text-sm text-gray-500">Joined on {moment(user.joinDate).format('Do MMMM YYYY')}</p>
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
                            <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">Membership:</span>
                            <span className="ml-2 text-sm text-gray-900">{user?.membershipType === 'bronze' ? 'Bronze' : user?.membershipType === 'gold' ? 'Gold' : user?.membershipType === 'pending' ? 'Bronze' : 'Loading...'}</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">Email:</span>
                            <span className="ml-2 text-sm text-gray-900">{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-semibold my-10">Latest Posts</h2>
            {latestPosts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Post</th>
                            <th className="py-3 px-6 text-center">Upvotes</th>
                            <th className="py-3 px-6 text-center">Downvotes</th>
                            <th className="py-3 px-6 text-center">Comments</th>
                            <th className="py-3 px-6 text-center">Views</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                        {latestPosts.map((post) => (
                            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <img className="w-12 h-12 object-cover" src={post.image || "/placeholder.svg"} alt={post.title} />
                                        </div>
                                        <span className="font-medium">
                                        {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
                                    </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                    {post.upvotes}
                                </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                    {post.downvotes}
                                </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                                    {post.commentCount}
                                </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                    {post.viewCount}
                                </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <Link
                                        to={`/user-dashboard/my-posts/post-details`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Read More
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No posts yet.</p>
            )}
        </div>
    );
};


export default UserProfilePage;
