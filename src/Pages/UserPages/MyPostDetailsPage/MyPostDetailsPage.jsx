import {useContext, useEffect, useState} from 'react';
import { FaClock, FaComment, FaThumbsUp, FaThumbsDown, FaExclamationTriangle, FaEdit, FaEye, FaTimes } from 'react-icons/fa';
import DataContext from "../../../Providers/DataContext.jsx";
import moment from "moment";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";


const MyPostDetailsPage = () => {

    const {postId} = useParams();
    const{fetchSinglePostFromServer, singlePost, saveUpdatedCommentToServer} = useContext(DataContext);
    const [comments, setComments] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const feedbackOptions = [
        "Inappropriate content",
        "Spam or misleading",
        "Harassment or hate speech",
        "False information",
        "Violates privacy",
        "Copyright infringement",
        "Self-promotion or advertising",
        "Contains harmful links",
        "Off-topic",
        "Other"
    ];
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                await fetchSinglePostFromServer(postId);
            }
        };
        fetchPost().then();
    }, [fetchSinglePostFromServer, postId]);


    useEffect(() => {
        const fetchComments = async () => {
            if (singlePost?.comments) {
                setComments(singlePost?.comments);
            }
        }
        fetchComments().then();
    }, [singlePost]);


    const handleFeedbackChange = (commentId, feedbackPhrase) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment?._id === commentId ? { ...comment, feedbackPhrase } : comment
            )
        );
    };


    const handleReport = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment => {
                if (comment?._id === commentId) {
                    const updatedComment = { ...comment, reportAction: 'Reported' };
                    // console.log("Reported Comment:", updatedComment);
                    saveUpdatedCommentToServer(updatedComment);
                    return updatedComment;
                }
                return comment;
            })
        );
    };


    const handleUpdatePost = () => {
        navigate(`/admin-dashboard/my-posts/update-post/${singlePost?._id}`);
    };


    const openModal = (comment) => {
        setSelectedComment(comment);
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
        setSelectedComment(null);
    };


    return (
        <div className="w-full mx-auto">

            {/* POST DETAILS CARD */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-10">
                    <div className="flex items-center mb-4">
                        <img
                            src={singlePost?.author?.photoURL || "/placeholder.svg"}
                            alt={singlePost?.author?.displayName || "Author"}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{singlePost?.author?.displayName}</h2>
                            <p className="text-sm text-gray-600 flex items-center">
                                <FaClock className="mr-2" />
                                {moment(singlePost?.publishedOn).format('LLL')}
                            </p>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{singlePost?.title}</h1>
                    <p className="text-gray-700 mb-6">{singlePost?.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {singlePost?.tags.map(tag => (
                            <span key={tag?._id} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {tag?.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="flex items-center text-sm text-gray-600">
                            <FaThumbsUp className="mr-1" />
                            {singlePost?.stats?.upVoteCounts} Upvotes
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                            <FaThumbsDown className="mr-1" />
                            {singlePost?.stats?.downVoteCounts} Downvotes
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                            <FaComment className="mr-1" />
                            {singlePost?.stats?.commentCounts} Comments
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                            <FaEye className="mr-1" />
                            {singlePost?.stats?.viewCounts} Views
                        </span>
                    </div>
                    <div className="flex items-center justify-end border-t border-gray-200 pt-4">
                        <button onClick={handleUpdatePost} className="flex items-center text-gray-600 hover:text-blue-500">
                            <FaEdit className="mr-1" />
                            <span>Update Post</span>
                        </button>
                    </div>
                </div>
            </div>


            {/* COMMENTS TABLE */}

            {comments?.length === 0
                ? (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Comments under this post</h3>
                    </div>
                )
                : (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-2">User</th>
                                    <th scope="col" className="px-4 py-2">Comment</th>
                                    <th scope="col" className="px-4 py-2">Feedback</th>
                                    <th scope="col" className="px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {comments?.map(comment => (
                                    <tr key={comment?._id} className="bg-white border-b">


                                        <td className="px-4 py-2">
                                            <div
                                                className="text-sm font-medium text-gray-900">{comment?.author?.name}</div>
                                            <div className="text-xs text-gray-500">{comment?.author?.email}</div>
                                            <div
                                                className="text-xs text-gray-400">{moment(comment?.createdAt).format('LLL')}</div>
                                        </td>


                                        <td className="px-4 py-2">
                                            {comment?.content.split(' ').slice(0, 15).join(' ')}
                                            <button
                                                onClick={() => openModal(comment)}
                                                className="ml-1 text-blue-600 hover:text-blue-800">
                                                Read More
                                            </button>
                                        </td>


                                        <td className="px-4 py-2">
                                            <select
                                                value={comment?.feedbackPhrase}
                                                onChange={(e) => handleFeedbackChange(comment?._id, e.target.value)}
                                                disabled={comment?.feedbackPhrase || comment?.reportAction}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                                            >
                                                <option value="">Select feedback</option>
                                                {feedbackOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </td>


                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleReport(comment?._id)}
                                                disabled={!comment?.feedbackPhrase || comment?.reportAction}
                                                className={`flex items-center text-base ${
                                                    comment?.feedbackPhrase && !comment?.reportAction
                                                        ? 'text-red-600 hover:text-red-800'
                                                        : 'text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                <FaExclamationTriangle className="mr-1"/>
                                                {comment?.reportAction === '' ? 'Report' : comment?.reportAction}
                                            </button>
                                        </td>


                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }



            {modalOpen && selectedComment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Comment by {selectedComment?.author?.name}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                    <FaTimes className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">{selectedComment?.content}</p>
                            <div className="text-sm text-gray-500">
                                <span className="flex items-center">
                                    <FaClock className="mr-1" />
                                    {moment(selectedComment?.createdAt).format('LLL')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default MyPostDetailsPage;
