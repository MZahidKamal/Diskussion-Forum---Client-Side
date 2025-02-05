import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { FaRegCommentAlt, FaRegHeart, FaRegEye, FaChartLine, FaRegNewspaper, FaUsers, FaThumbsUp, FaThumbsDown, FaUserShield, FaCrown } from 'react-icons/fa';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import AuthContext from "../../../Providers/AuthContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);


const AdminDashboardPage = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const [admin, setAdmin] = useState(null);
    const [statistics, setStatistics] = useState(null);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchAdminData = async () => {
            // Simulating API call to fetch admin data
            const adminData = {
                name: registeredUser?.displayName || 'Loading...',
                email: registeredUser?.email || 'Loading...',
                avatar: registeredUser?.photoURL || 'https://i.pravatar.cc/150?img=1',
                role: registeredUser?.role || 'Loading...',
                membershipType: registeredUser?.membershipType || 'Loading...'
            };
            setAdmin(adminData);
        };

        const fetchStatistics = async () => {
            // Simulating API call to fetch statistics
            const stats = {
                admin: {
                    totalPosts: 50,
                    totalViews: 15000,
                    totalLikes: 8000,
                    totalComments: 3000,
                    totalUpvotes: 12000,
                    totalDownvotes: 500,
                },
                portal: {
                    totalPosts: 1500,
                    totalViews: 45000,
                    totalLikes: 24000,
                    totalComments: 10000,
                    totalUpvotes: 35000,
                    totalDownvotes: 2000,
                    bronzeMembers: 1000,
                    goldMembers: 500,
                },
                postActivity: [
                    { month: 'Jan', count: 100 },
                    { month: 'Feb', count: 150 },
                    { month: 'Mar', count: 80 },
                    { month: 'Apr', count: 120 },
                    { month: 'May', count: 200 },
                    { month: 'Jun', count: 180 },
                ],
            };
            setStatistics(stats);
        };

        fetchAdminData().then();
        fetchStatistics().then();
    }, [registeredUser]);


    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group">
            <div className="flex items-start justify-between">
                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
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
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    };


    const OverviewPieChart = ({ labels, data, colors }) => {
        const chartData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => `${color}80`),
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

        return <Pie data={chartData} options={options} />;
    };


    OverviewPieChart.propTypes = {
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    };


    const PostActivityGraph = ({ postActivity }) => {
        const data = {
            labels: postActivity.map(item => item.month),
            datasets: [
                {
                    label: 'Total Posts',
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
            <>
                <h3 className="text-lg font-semibold mb-2">Post Activity Over Time</h3>
                <div className="h-[250px]">
                    <Line data={data} options={options} />
                </div>
            </>
        );
    };


    PostActivityGraph.propTypes = {
        postActivity: PropTypes.arrayOf(
            PropTypes.shape({
                month: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        ).isRequired,
    };


    if (!admin || !statistics) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center">
                <img src={admin.avatar || "/placeholder.svg"} alt={admin.name} className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4 object-cover" />
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold text-gray-800">{admin.name}</h2>
                    <p className="text-gray-600">{admin.email}</p>
                    <div className="flex items-center mt-1 text-base text-gray-500">
                        <FaUserShield className="mr-1" />
                        {admin?.role === 'admin' ? 'Admin' : admin?.role === 'user' ? 'User' : admin?.role === 'pending' ? 'User' : 'Loading...'}
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-base font-medium bg-yellow-100 text-yellow-800">
                        <FaCrown className="w-4 h-4 mr-1.5" />
                        {admin?.membershipType === 'gold' ? 'Gold Member' : admin?.membershipType === 'bronze' ? 'Bronze Member' : admin?.membershipType === 'pending' ? 'Bronze Member' : 'Loading...'}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaChartLine className="mr-2 text-purple-600" />
                    Admin Statistics Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard icon={FaRegNewspaper} title="Total Posts" value={statistics.admin.totalPosts} color="text-blue-600" />
                    <StatCard icon={FaRegEye} title="Total Views" value={statistics.admin.totalViews} color="text-green-600" />
                    <StatCard icon={FaRegHeart} title="Total Likes" value={statistics.admin.totalLikes} color="text-red-600" />
                    <StatCard icon={FaRegCommentAlt} title="Total Comments" value={statistics.admin.totalComments} color="text-purple-600" />
                    <StatCard icon={FaThumbsUp} title="Total Upvotes" value={statistics.admin.totalUpvotes} color="text-indigo-600" />
                    <StatCard icon={FaThumbsDown} title="Total Downvotes" value={statistics.admin.totalDownvotes} color="text-pink-600" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaChartLine className="mr-2 text-purple-600" />
                    Portal Statistics Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={FaRegNewspaper} title="Total Posts" value={statistics.portal.totalPosts} color="text-blue-600" />
                    <StatCard icon={FaRegEye} title="Total Views" value={statistics.portal.totalViews} color="text-green-600" />
                    <StatCard icon={FaRegHeart} title="Total Likes" value={statistics.portal.totalLikes} color="text-red-600" />
                    <StatCard icon={FaRegCommentAlt} title="Total Comments" value={statistics.portal.totalComments} color="text-purple-600" />
                    <StatCard icon={FaThumbsUp} title="Total Upvotes" value={statistics.portal.totalUpvotes} color="text-indigo-600" />
                    <StatCard icon={FaThumbsDown} title="Total Downvotes" value={statistics.portal.totalDownvotes} color="text-pink-600" />
                    <StatCard icon={FaUsers} title="Bronze Members" value={statistics.portal.bronzeMembers} color="text-gray-500" />
                    <StatCard icon={FaCrown} title="Gold Members" value={statistics.portal.goldMembers} color="text-yellow-500" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">Engagement Overview</h3>
                    <div className="h-[300px]">
                        <OverviewPieChart
                            labels={['Views', 'Likes', 'Comments', 'Upvotes', 'Downvotes']}
                            data={[statistics.portal.totalViews, statistics.portal.totalLikes, statistics.portal.totalComments, statistics.portal.totalUpvotes, statistics.portal.totalDownvotes]}
                            colors={['#007bff', '#dc3545', '#28a745', '#6610f2', '#ffc107']}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <PostActivityGraph postActivity={statistics.postActivity} />
                </div>
            </div>
        </div>
    );
};


export default AdminDashboardPage;
