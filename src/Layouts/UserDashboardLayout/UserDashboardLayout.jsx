import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from "react-router";

const UserDashboardLayout = () => {
    const userDashboardTabs = [
        {
            name: 'My Profile',
            path: '/user-dashboard/user-profile',
        },
        {
            name: 'Add Post',
            path: '/user-dashboard/create-new-post'
        },
        {
            name: 'My Posts',
            path: '/user-dashboard/my-posts'
        },
        {
            name: 'Manage Membership',
            path: '/user-dashboard/manage-membership'
        }
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
                            <Link to={{pathname: '/user-dashboard'}} className="text-2xl font-bold m-4">User Dashboard</Link>
                            <hr className="my-3" />
                            <nav>
                                <ul className="my-5 space-y-2">
                                    {userDashboardTabs.map((tab, index) => (
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

export default UserDashboardLayout;
