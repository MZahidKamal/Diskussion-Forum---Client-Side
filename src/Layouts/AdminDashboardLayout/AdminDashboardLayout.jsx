import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from "react-router";

const AdminDashboardLayout = () => {
    const adminDashboardTabs = [
        {
            name: 'Admin Profile',
            path: '/admin-dashboard/admin-profile',
        },
        {
            name: 'Add Post',
            path: '/admin-dashboard/create-new-post'
        },
        {
            name: 'My Posts',
            path: '/admin-dashboard/my-posts'
        },
        {
            name: 'Manage Membership',
            path: '/admin-dashboard/manage-membership'
        },
        {
            name: 'Manage Users',
            path: '/admin-dashboard/manage-users'
        },
        {
            name: 'Make Announcement',
            path: '/admin-dashboard/make-announcements'
        },
        {
            name: 'Reported Comments',
            path: '/admin-dashboard/reported-comments'
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const handleTabClick = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side Panel */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <Link to={{pathname: '/admin-dashboard'}} className="text-2xl font-bold m-4">Admin Dashboard</Link>
                            <hr className="my-3" />
                            <nav>
                                <ul className="my-5 space-y-2">
                                    {adminDashboardTabs.map((tab, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleTabClick(`${tab.path}`)}
                                                className={`w-full text-left px-4 py-2 rounded-md ${location.pathname.includes(tab.path) ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                                            >
                                                {tab.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
