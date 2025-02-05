import {useState, useEffect, useContext} from 'react';
import {FaCalendarAlt, FaPaperPlane, FaExclamationCircle, FaUser, FaEnvelope} from 'react-icons/fa';
import AuthContext from "../../../Providers/AuthContext.jsx";
import DataContext from "../../../Providers/DataContext.jsx";
import moment from "moment";


const MakeAnnouncementsPage = () => {

    const {user: registeredUser} = useContext(AuthContext)
    const {saveNewAnnouncementToServer, allAnnouncements} = useContext(DataContext)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            const newAnnouncementObj = {
                title: title.trim(),
                description: description.trim(),
                author: {
                    _id: registeredUser?._id,
                    displayName: registeredUser?.displayName,
                    photoURL: registeredUser?.photoURL,
                },
                publishDate: new Date().toISOString(),
                viewedByUserIds: [],
            };
            // console.log('New announcement: ', newAnnouncementObj)
            await saveNewAnnouncementToServer(newAnnouncementObj)

            setTitle('');
            setDescription('');
        }
    };


    return (
        <div className="w-full mx-auto">

            {/* CREATE NEW ANNOUNCEMENT */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">

                <div className="flex items-center space-x-4 mb-6">
                    <img src={registeredUser?.photoURL || "/placeholder.svg"} alt={registeredUser?.displayName} className="w-12 h-12 rounded-full" />
                    <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                            <FaUser className="mr-2" />
                            {registeredUser?.displayName || 'Loading..'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <FaEnvelope className="mr-2" />
                            {registeredUser?.email || 'Loading..'}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Announcement Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter announcement title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Announcement Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter announcement description"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
                    >
                        <FaPaperPlane className="mr-2" />
                        Publish Announcement
                    </button>
                </form>
            </div>


            {/* PUBLISHED ANNOUNCEMENTS */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Announcement
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Publish Date
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {allAnnouncements.map((announcement) => (
                        <tr key={announcement?._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full object-cover" src={announcement?.author?.photoURL || "/placeholder.svg"} alt={announcement?.author?.displayName}/>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{announcement?.author?.displayName}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900 mb-1">{announcement?.title}</div>
                                <div className="text-sm text-gray-500">{announcement?.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    {moment(announcement?.publishDate).format('LLLL')}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {allAnnouncements.length === 0 && (
                <div className="text-center py-8">
                    <FaExclamationCircle className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-500">No announcements yet.</p>
                </div>
            )}
        </div>
    );
};


export default MakeAnnouncementsPage;
