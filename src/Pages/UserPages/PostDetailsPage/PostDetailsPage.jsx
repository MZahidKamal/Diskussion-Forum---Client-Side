import {useState, useEffect, useContext} from 'react';
import {FaUser, FaClock, FaComment, FaThumbsUp, FaThumbsDown, FaWhatsapp, FaEye} from 'react-icons/fa';
import { WhatsappShareButton } from 'react-share';
import {useParams} from "react-router";
import DataContext from "../../../Providers/DataContext.jsx";
import moment from "moment";
import AuthContext from "../../../Providers/AuthContext.jsx";
import useFetchSinglePostFromServer from "../../../CustomHooks/useFetchSinglePostFromServer.jsx";


const PostDetails = () => {


    const {postId} = useParams();
    const {user} = useContext(AuthContext)
    const {saveNewCommentToServer, saveAVoteOfAPostToServer} = useContext(DataContext);
    const {data: singlePost, refetch} = useFetchSinglePostFromServer(user?._id, postId)
    const [comment, setComment] = useState('');


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleUpvote = async () => {
        if (user) {
            // Save the vote to the server
            await saveAVoteOfAPostToServer({
                postId: postId,
                vote: +1
            });
            // Refetch the data to ensure the vote counts of the post data are updated
            await refetch();
        }
    };


    const handleDownvote = async () => {
        if (user) {
            // Save the vote to the server
            await saveAVoteOfAPostToServer({
                postId: postId,
                vote: -1
            });
            // Refetch the data to ensure the vote counts of the post data are updated
            await refetch();
        }
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() && user) {
            const newComment = {
                content: comment,
                author: {
                    _id: user?._id,
                    name: user?.displayName,
                    email: user?.email,
                    avatar: user?.photoURL,
                },
                createdAt: new Date().toISOString(),
                postId: singlePost?._id,
                postTitle: singlePost?.title,
                feedbackPhrase: '',
                reportAction: ''
            };
            await saveNewCommentToServer({
                postId: postId,
                newCommentObj: newComment});
            await refetch();
            await setComment('');
            console.log('New comment: ', newComment);
        }
    };


    if (!singlePost) {
        return <div className="text-center py-10">Loading...</div>;
    }


    return (
        <div className="max-w-5xl mx-auto m-5 border-t-2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
                <div className="flex items-center mb-4">
                    <img
                        src={singlePost?.author?.photoURL || "/placeholder.svg"}
                        alt={singlePost?.author?.displayName}
                        className="w-10 h-10 rounded-full mr-4 object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{singlePost?.author?.displayName}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                            <FaClock className="mr-2" />
                            <span>{moment(singlePost?.publishedOn).format('LLL')}</span>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{singlePost?.title}</h2>
                <p className="text-gray-700 mb-6">{singlePost?.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {singlePost?.tags.map(tag => (
                        <span key={tag?._id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {tag?.name}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleUpvote}
                            disabled={!user || singlePost?.author?.upVotedPosts?.includes(singlePost?._id)}
                            className={`flex items-center space-x-1 ${!user || singlePost?.author?.upVotedPosts?.includes(singlePost?._id) ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'}`}
                        >
                            <FaThumbsUp />
                            <span className={'pr-1'}>{singlePost?.stats?.upVoteCounts}</span>
                            Upvotes
                        </button>
                        <button
                            onClick={handleDownvote}
                            disabled={!user || singlePost?.author?.downVotedPosts?.includes(singlePost?._id)}
                            className={`flex items-center space-x-1 ${!user || singlePost?.author?.downVotedPosts?.includes(singlePost?._id) ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'}`}
                        >
                            <FaThumbsDown />
                            <span className={'pr-1'}>{singlePost?.stats?.downVoteCounts}</span>
                            Downvotes
                        </button>
                        <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                            <FaComment />
                            <span className={'pr-1'}>{singlePost?.stats?.commentCounts}</span>
                            Comments
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                            <FaEye />
                            <span className={'pr-1'}>{singlePost?.stats?.viewCounts}</span>
                            Views
                        </div>
                    </div>
                    <WhatsappShareButton url={window.location.href} title={singlePost?.title}>
                        <div className="flex items-center space-x-2 bg-green-500 text-white px-5 py-1 rounded-lg hover:bg-green-600 transition duration-200">
                            <FaWhatsapp />
                            <span>Share</span>
                        </div>
                    </WhatsappShareButton>
                </div>
            </div>
            <div className="bg-gray-50 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            rows="3"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Post Comment
                        </button>
                    </form>
                ) : (
                    <p className="text-gray-600 mb-4">Please log in to comment.</p>
                )}
                <div className="space-y-4">
                    {singlePost?.comments?.map((comment) => (
                        <div key={comment?._id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-center mb-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <span className="font-semibold text-gray-800">{comment?.author?.name}</span>
                                <span className="text-sm text-gray-600 ml-auto">
                                    {moment(comment?.createdAt).format('LLLL')}
                                </span>
                            </div>
                            <p className="text-gray-700">{comment?.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default PostDetails;
