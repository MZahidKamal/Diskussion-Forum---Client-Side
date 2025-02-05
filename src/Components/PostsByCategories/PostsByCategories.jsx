import {useState, useContext} from 'react';
import {FaFolder, FaThumbsUp, FaThumbsDown, FaComment, FaEye} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DataContext from "../../Providers/DataContext.jsx";
import moment from "moment";


const PostsByCategories = () => {

    const {allCategories, allPosts} = useContext(DataContext)
    const [selectedCategory, setSelectedCategory] = useState([]);


    const handleCategorySelect = (categoryId) => {
        setSelectedCategory((prevSelectedTags) =>
            prevSelectedTags.includes(categoryId) ? prevSelectedTags.filter((id) => id !== categoryId) : [...prevSelectedTags, categoryId],
        )
    }


    const filteredPosts =
        selectedCategory?.length > 0 ? allPosts.filter((post) => post?.categoryIds?.some((categoryId) => selectedCategory.includes(categoryId))) : allPosts


    return (
        <div className="bg-white rounded-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                    <FaFolder className="mr-2 text-purple-600" />
                    Posts by Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                    {allCategories?.map((category) => (
                        <button
                            key={category?._id}
                            onClick={() => handleCategorySelect(category._id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                selectedCategory.includes(category?._id)
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category?.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredPosts?.map((post) => (
                    <article key={post?._id} className="bg-white border-t-2 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
                        <div className="px-8 py-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {post?.title}
                            </h3>
                            <p className="text-sm text-gray-600 text-justify mb-4">
                                {post?.description.split(' ').slice(0, 15).join(' ')}
                                <Link
                                    to={{pathname: `/post-details/${post?._id}`}}
                                    className="ml-2 font-semibold italic inline-block text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                                    Read More...
                                </Link>
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center space-x-4 mt-2">
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaThumbsUp className="mr-1" />
                                        {post?.stats?.upVoteCounts}
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaThumbsDown className="mr-1" />
                                        {post?.stats?.downVoteCounts}
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaComment className="mr-1" />
                                        {post?.stats?.commentCounts}
                                    </span>
                                    <span className="flex items-center text-sm text-gray-600">
                                        <FaEye className="mr-1" />
                                        {post?.stats?.viewCounts}
                                    </span>
                                </div>
                                <p className={'text-sm'}>{moment(post?.publishedOn).format("MMM Do YY")}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};


export default PostsByCategories;
