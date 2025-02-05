import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import DataContext from "../../../Providers/DataContext.jsx";


const ReportedCommentsPage = () => {

    const {fetchAllReportedComments, allReportedComments, saveUpdatedCommentReportActionToServer} = useContext(DataContext);
    const [reportedComments, setReportedComments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchComments = async () => {
            await fetchAllReportedComments();
        }
        fetchComments().then();
        if (allReportedComments) {
            setReportedComments(allReportedComments);
        }
    }, [allReportedComments, fetchAllReportedComments]);


    const actionOptions = [
        "Reported",
        "No Action Needed",
        "Hide Comment"
    ];


    const handleActionChange = async (commentId, updatedReportAction) => {
        // console.log(commentId, updatedReportAction)
        await saveUpdatedCommentReportActionToServer({
            commentId: commentId,
            updatedReportAction: updatedReportAction
        });
        await fetchAllReportedComments();
    };


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
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
            {reportedComments?.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-gray-500">No reported comments at the moment.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Commenter
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Comment
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Report
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {reportedComments?.map((comment) => (
                                <tr key={comment?._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${comment?.author?.name}&background=random`} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{comment?.author?.name}</div>
                                                <div className="text-sm text-gray-500">{comment?.author?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 mb-1">
                                            <Link to={`/admin-dashboard/my-posts/post-details/${comment?.postId}`} className="font-medium text-indigo-600 hover:text-indigo-900">
                                                {truncateText(comment?.postTitle, 30)}
                                            </Link>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {truncateText(comment?.content, 50)}
                                            {comment?.content?.length > 50 && (
                                                <button
                                                    onClick={() => openModal(comment)}
                                                    className="ml-1 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
                                                >
                                                    Read more
                                                </button>
                                            )}
                                        </p>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {new Date(comment?.createdAt).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-100 text-red-800">
                                            {comment?.feedbackPhrase || 'Loading...'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="relative inline-block text-left">
                                            <select
                                                value={comment?.reportAction}
                                                onChange={(e) => handleActionChange(comment?._id, e.target.value)}
                                                disabled={comment?.reportAction === 'No Action Needed' || comment?.reportAction === 'Hide Comment'}
                                                className={`block w-full pl-3 pr-10 py-1 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                                                    comment?.reportAction === 'solved' ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                <option value="">Select Action</option>
                                                {actionOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

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
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <FaTimes className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">{selectedComment?.content}</p>
                            <div className="text-sm text-gray-500">
                                <p>Email: {selectedComment?.author?.email}</p>
                                <p>Date: {new Date(selectedComment?.createdAt).toLocaleString()}</p>
                                <p>Post: {selectedComment?.postTitle}</p>
                                <p>Report: {selectedComment?.feedbackPhrase}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ReportedCommentsPage;
