import {useState, useContext, useEffect} from 'react';
import { FaBullhorn, FaCheckCircle, FaRegCircle, FaClock, FaChevronRight, FaTimes } from 'react-icons/fa';
import DataContext from "../../Providers/DataContext.jsx";
import AuthContext from "../../Providers/AuthContext.jsx";
import moment from "moment";


const LatestAnnouncements = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const {allAnnouncements, makeThisAnnouncementReadByThisUser} = useContext(DataContext);

    const [unreadAnnouncements, setUnreadAnnouncements] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);


    useEffect(() => {
        if (allAnnouncements?.length === 0) return;
        const unreadAnnouncements = allAnnouncements?.filter(announcement => !announcement?.viewedByUserIds.includes(registeredUser?._id));
        setUnreadAnnouncements(unreadAnnouncements);
    }, [allAnnouncements, registeredUser?._id]);

    const openModal = (announcement) => {
        setCurrentAnnouncement(announcement);
        setIsModalOpen(true);

    };


    const closeModal = async (announcementId) => {
        setIsModalOpen(false);
        setTimeout(() => {
            makeThisAnnouncementReadByThisUser(announcementId)
            setCurrentAnnouncement(null);
        }, 2000);
    };


    if (!registeredUser || unreadAnnouncements?.length === 0 ) return <section></section>;


    return (
        <section id="latest-announcements" className="py-10 pb-20 drop-shadow-2xl">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBullhorn className="mr-2 text-purple-600" />
                    Latest Announcements
                </h2>
                <div className="space-y-4">
                    {unreadAnnouncements?.map((announcement) => (
                        <div
                            key={announcement?._id}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                                announcement?.viewedByUserIds.includes(registeredUser?._id) ? 'opacity-75' : 'border-l-4 border-purple-500'
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                        {announcement?._id === currentAnnouncement?._id ? (
                                            <FaCheckCircle className="mr-2 text-green-500" />
                                        ) : (
                                            <FaRegCircle className="mr-2 text-purple-500" />
                                        )}
                                        {announcement?.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4 truncate tr">{announcement?.description}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <FaClock className="mr-1" />
                                        {moment(announcement?.publishDate).format('LLLL')}
                                    </span>
                                    <button
                                        onClick={() => openModal(announcement)}
                                        className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
                                    >
                                        Read more
                                        <FaChevronRight className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && currentAnnouncement && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {currentAnnouncement?.title}
                                </h3>
                                <button
                                    onClick={()=> closeModal(currentAnnouncement?._id)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <FaTimes className="w-6 h-6"/>
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">{currentAnnouncement?.description}</p>
                            <div className="text-sm text-gray-500">
                                <span className="flex items-center">
                                    <FaClock className="mr-1"/>
                                    {moment(currentAnnouncement?.publishDate).format('LLLL')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};


export default LatestAnnouncements;
