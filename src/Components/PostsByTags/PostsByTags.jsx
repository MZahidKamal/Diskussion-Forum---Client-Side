import { useState, useContext, useEffect } from "react"
import { FaTags, FaThumbsUp, FaThumbsDown, FaComment, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import DataContext from "../../Providers/DataContext.jsx"
import moment from "moment"
import useFetchAllFilteredPostsFromServer from "../../CustomHooks/useFetchAllFilteredPostsFromServer.jsx";


const PostsByTags = () => {

    const { allTags } = useContext(DataContext)

    const [selectedTag, setSelectedTag] = useState('')
    const [postsPerPage, setPostsPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)

    const {data, refetch} = useFetchAllFilteredPostsFromServer(selectedTag, '', postsPerPage, currentPage)

    
    const [filteredPosts, setFilteredPosts] = useState([])
    const [totalPostsCount, setTotalPostsCount] = useState(0)

    useEffect(() => {
        setFilteredPosts(data?.results)
        setTotalPostsCount(data?.totalDocuments)
    }, [data?.results, data?.totalDocuments]);


    const handleTagSelect = async (tagId) => {
        await setSelectedTag(tagId)
        await setCurrentPage(1)
        await refetch()
    }


    const clearAllTags = async () => {
        await setSelectedTag('')
        await setCurrentPage(1)
        await refetch()
    }


    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPostsCount / postsPerPage); i++) {
        pageNumbers.push(i)
    }


    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber)
        await refetch()
    }


    const handlePostsPerPageChange = async (e) => {
        await setPostsPerPage(Number(e.target.value))
        setCurrentPage(1)
    }


    return (
        <div className="bg-white rounded-lg p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaTags className="mr-2 text-purple-600" />
                        Posts by Tags
                    </h2>
                    <button
                        onClick={clearAllTags}
                        className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200"
                    >
                        Clear all
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {allTags?.map((tag) => (
                        <button
                            key={tag?._id}
                            onClick={() => handleTagSelect(tag?._id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                selectedTag === tag?._id
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {tag?.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredPosts?.map((post) => (
                    <article
                        key={post?._id}
                        className="bg-white rounded-lg shadow-lg border-t-2 overflow-hidden transition-shadow duration-300 hover:shadow-md"
                    >
                        <div className="px-10 py-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{post?.title}</h3>
                            <p className="text-gray-600 mb-4">
                                {post?.description.split(" ").slice(0, 15).join(" ")}
                                <Link
                                    to={{ pathname: `/post-details/${post?._id}` }}
                                    className="ml-2 font-semibold italic inline-block text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                >
                                    Read More...
                                </Link>
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-4 mt-2">
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaThumbsUp className="mr-1" />
                                        {post?.stats?.upVoteCounts} Upvotes
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaThumbsDown className="mr-1" />
                                        {post?.stats?.downVoteCounts} Downvotes
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaComment className="mr-1" />
                                        {post?.stats?.commentCounts} Comments
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaEye className="mr-1" />
                                        {post?.stats?.viewCounts} Views
                                    </span>
                                </div>
                                <span>{moment(post?.publishedOn).format("LLLL")}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-10 flex justify-center items-center space-x-10">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Posts per page:</span>
                    <select
                        value={postsPerPage}
                        onChange={handlePostsPerPageChange}
                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
                    >
                        <FaChevronLeft />
                    </button>
                    {pageNumbers?.map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`px-3 py-1 rounded ${
                                currentPage === number ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } transition-colors duration-200`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostsByTags
