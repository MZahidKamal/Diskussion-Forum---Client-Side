import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { FaRegCommentAlt, FaRegHeart, FaRegEye, FaChartLine, FaRegNewspaper, FaThumbsUp, FaThumbsDown, FaUser, FaCrown } from 'react-icons/fa';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import AuthContext from "../../../Providers/AuthContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);


const UserDashboardPage = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [statistics, setStatistics] = useState(null);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchUserData = async () => {
            // In a real application, you would fetch this data from an API
            const userData = {
                name: registeredUser?.displayName || 'Loading...',
                email: registeredUser?.email || 'Loading...',
                avatar: registeredUser?.photoURL || 'https://i.pravatar.cc/150?img=3',
                role: registeredUser?.role || 'Loading...',
                membershipType: registeredUser?.membershipType || 'Loading...'
            };
            setUser(userData);
        };

        const fetchStatistics = async () => {
            // In a real application, you would fetch this data from an API
            const stats = {
                totalPosts: 42,
                totalViews: 12890,
                totalLikes: 738,
                totalComments: 291,
                totalUpvotes: 1256,
                totalDownvotes: 87,
                postActivity: [
                    { month: 'Jan', count: 10 },
                    { month: 'Feb', count: 15 },
                    { month: 'Mar', count: 8 },
                    { month: 'Apr', count: 12 },
                    { month: 'May', count: 20 },
                    { month: 'Jun', count: 18 },
                ]
            };
            setStatistics(stats);
        };
        fetchUserData().then();
        fetchStatistics().then();
    }, [registeredUser]);


    const UserCard = ({ user }) => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4 object-cover" />
            <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-1 text-base text-gray-500">
                    <FaUser className="mr-1 text-xs" />
                    {user?.role === 'user' ? 'User' : user?.role === 'admin' ? 'Admin' : user?.role === 'pending' ? 'User' : 'Loading...'}
                </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-base font-medium bg-yellow-100 text-yellow-800">
                    <FaCrown className="w-4 h-4 mr-1.5" />
                    {user?.membershipType === 'bronze' ? 'Bronze Member' : user?.membershipType === 'gold' ? 'Gold Member' : user?.membershipType === 'pending' ? 'Bronze Member' : 'Loading...'}
                </div>
            </div>
        </div>
    );


    UserCard.propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            avatar: PropTypes.string,
            role: PropTypes.string,
            membershipType: PropTypes.string,
        }),
    };


    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group">
            <div className="flex items-start justify-between">
                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </h3>
                </div>
                <div className={`p-2 rounded-lg ${color} bg-opacity-10 relative z-10`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 -mr-8 -mb-8 bg-gradient-to-br from-current to-transparent opacity-[0.03] rounded-full transform rotate-12 group-hover:scale-110 transition-transform duration-300" />
        </div>
    );


    StatCard.propTypes = {
        icon: PropTypes.elementType.isRequired,
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        color: PropTypes.string.isRequired,
    };


    const UserEngagementOverview = ({ statistics }) => {
        const data = {
            labels: ['Views', 'Likes', 'Comments', 'Upvotes', 'Downvotes'],
            datasets: [
                {
                    data: [statistics.totalViews, statistics.totalLikes, statistics.totalComments, statistics.totalUpvotes, statistics.totalDownvotes],
                    backgroundColor: ['#4299E1', '#48BB78', '#ED8936', '#ECC94B', '#F56565'],
                    borderColor: ['#3182CE', '#38A169', '#DD6B20', '#D69E2E', '#E53E3E'],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        };

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">User Engagement Overview</h3>
                <div className="h-[300px]">
                    <Pie data={data} options={options} />
                </div>
            </div>
        );
    };

    UserEngagementOverview.propTypes = {
        statistics: PropTypes.shape({
            totalPosts: PropTypes.number.isRequired,
            totalViews: PropTypes.number.isRequired,
            totalLikes: PropTypes.number.isRequired,
            totalComments: PropTypes.number.isRequired,
            totalUpvotes: PropTypes.number.isRequired,
            totalDownvotes: PropTypes.number.isRequired,
            postActivity: PropTypes.arrayOf(
                PropTypes.shape({
                    month: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired
                })
            ).isRequired
        }).isRequired
    };

    const UserPostActivityOverTime = ({ postActivity }) => {
        const data = {
            labels: postActivity.map(item => item.month),
            datasets: [
                {
                    label: 'Posts',
                    data: postActivity.map(item => item.count),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Posts',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                    },
                },
            },
        };

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Post Activity Over Time</h3>
                <div className="h-[300px]">
                    <Line data={data} options={options} />
                </div>
            </div>
        );
    };


    UserPostActivityOverTime.propTypes = {
        postActivity: PropTypes.arrayOf(
            PropTypes.shape({
                month: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        ).isRequired,
    };


    if (!user || !statistics) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto">
            <UserCard user={user} />

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaChartLine className="mr-2 text-purple-600" />
                    User Statistics Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard icon={FaRegNewspaper} title="Total Posts" value={statistics.totalPosts} color="text-blue-600" />
                    <StatCard icon={FaRegEye} title="Total Views" value={statistics.totalViews} color="text-green-600" />
                    <StatCard icon={FaRegHeart} title="Total Likes" value={statistics.totalLikes} color="text-red-600" />
                    <StatCard icon={FaRegCommentAlt} title="Total Comments" value={statistics.totalComments} color="text-purple-600" />
                    <StatCard icon={FaThumbsUp} title="Total Upvotes" value={statistics.totalUpvotes} color="text-indigo-600" />
                    <StatCard icon={FaThumbsDown} title="Total Downvotes" value={statistics.totalDownvotes} color="text-pink-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserEngagementOverview statistics={statistics} />
                <UserPostActivityOverTime postActivity={statistics.postActivity} />
            </div>
        </div>
    );
};

export default UserDashboardPage;
