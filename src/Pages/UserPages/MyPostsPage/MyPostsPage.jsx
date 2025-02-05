import {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { FaEye, FaThumbsUp, FaThumbsDown, FaComments, FaCalendarAlt, FaExternalLinkAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AuthContext from "../../../Providers/AuthContext.jsx";
import DataContext from "../../../Providers/DataContext.jsx";
import moment from "moment";


const MyPostsPage = () => {

    const {user} = useContext(AuthContext);
    const {fetchAllMyPostsFromServer, allMyPosts, deleteOneOfMyPostFromServer} = useContext(DataContext);
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchMyPosts = async () => {
            if (user) {
                await fetchAllMyPostsFromServer({
                    userId: user?._id,
                    userEmail: user?.email
                });
            }
        };
        fetchMyPosts().then();
    }, [fetchAllMyPostsFromServer, user, user?.createdPosts.length]);


    const handleOpenPost = (postId) => {
        if (user && user?.role === 'admin') return navigate(`/admin-dashboard/my-posts/post-details/${postId}`);
        if (user && user?.role === 'user') return navigate(`/user-dashboard/my-posts/post-details/${postId}`);
        if (user && user?.role === 'pending') return navigate(`/user-dashboard/my-posts/post-details/${postId}`);
    };


    const handleEditPost = (postId) => {
        if (user && user?.role === 'admin') return navigate(`/admin-dashboard/my-posts/update-post/${postId}`);
        if (user && user?.role === 'user') return navigate(`/user-dashboard/my-posts/update-post/${postId}`);
        if (user && user?.role === 'pending') return navigate(`/user-dashboard/my-posts/update-post/${postId}`);
    };


    const handleDeletePost = async (postId) => {
        await deleteOneOfMyPostFromServer(postId)
        await fetchAllMyPostsFromServer({
            userId: user?._id,
            userEmail: user?.email
        });
    };

    if (!allMyPosts) {
        return <div className="text-center py-10">Loading...</div>;
    }


    return (
        <div className="w-full mx-auto">

            {allMyPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-gray-500">No my posts at the moment.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                My Post Titles
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                Stats
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Post Dates
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {allMyPosts.map((post) => (
                            <tr key={post?._id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{post?.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="flex items-center space-x-5 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <FaThumbsUp className="text-green-500 mr-1" />
                                        {post?.stats?.upVoteCounts}
                                    </span>
                                        <span className="flex items-center">
                                            <FaThumbsDown className="text-red-500 mr-1" />
                                            {post?.stats?.downVoteCounts}
                                        </span>
                                        <span className="flex items-center">
                                            <FaEye className="text-blue-500 mr-1" />
                                            {post?.stats?.viewCounts}
                                        </span>
                                        <span className="flex items-center">
                                            <FaComments className="text-purple-500 mr-1" />
                                            {post?.stats?.commentCounts}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 flex items-center">
                                        <FaCalendarAlt className="mr-2 text-gray-400" />
                                        {moment(post?.publishedOn).format('LLL')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-5">
                                        <Tippy content="See full post">
                                            <button
                                                onClick={() => handleOpenPost(post?._id)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                            >
                                                <FaExternalLinkAlt className="w-5 h-5" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Edit post">
                                            <button
                                                onClick={() => handleEditPost(post?._id)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Delete post">
                                            <button
                                                onClick={() => handleDeletePost(post?._id)}
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                            >
                                                <FaTrashAlt className="w-5 h-5" />
                                            </button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}




        </div>
    );
};


export default MyPostsPage;
