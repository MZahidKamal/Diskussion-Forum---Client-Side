import React, {useState, useEffect, useContext} from 'react';
import { FaUser, FaEnvelope, FaUserTag, FaCrown, FaSearch, FaChevronDown, FaChevronUp, FaSort } from 'react-icons/fa';
import AuthContext from "../../../Providers/AuthContext.jsx";
import DataContext from "../../../Providers/DataContext.jsx";


const ManageUsersPage = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const {fetchAllUsersFromServerRollSorted, allUsersRollSorted, saveUpdatedUserRoleToServer} = useContext(DataContext);

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            if (registeredUser) {
                await fetchAllUsersFromServerRollSorted(registeredUser?.email);
            }
        };
        fetchUsers().then();
    }, [fetchAllUsersFromServerRollSorted, registeredUser]);


    useEffect(() => {
        const updateUsers = async () => {
            if (allUsersRollSorted) {
                setUsers(allUsersRollSorted);
            }
        };
        updateUsers().then();
    }, [allUsersRollSorted]);


    const actionOptions = [
        "User",
        "Pending",
        "Admin"
    ];


    const handleRoleChange = async (userId, updatedUserRole) => {
        await saveUpdatedUserRoleToServer({
            userId: userId,
            updatedUserRole: updatedUserRole.toLowerCase()
        });
        await fetchAllUsersFromServerRollSorted(registeredUser?.email);
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };


    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig.key !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);


    const filteredUsers = sortedUsers.filter(user =>
        user?.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />;
        }
        return <FaSort className="ml-1" />;
    };


    return (
        <div className="w-full mx-auto">
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search users by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-blue-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            <div className="flex items-center">
                                <FaUser className="mr-2 text-black" />
                                User Name
                                {getSortIcon('name')}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                            <div className="flex items-center">
                                <FaEnvelope className="mr-2 text-black" />
                                Email
                                {getSortIcon('email')}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => handleSort('role')}>
                            <div className="flex items-center">
                                <FaUserTag className="mr-2 text-black" />
                                Role
                                {getSortIcon('role')}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => handleSort('subscriptionStatus')}>
                            <div className="flex items-center">
                                <FaCrown className="mr-2 text-black" />
                                Subscription
                                {getSortIcon('subscriptionStatus')}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user?._id} className="hover:bg-gray-50">
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={`${user?.photoURL || 'https://i.pravatar.cc/40'}`} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user?.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${user.role === 'admin' ? 'bg-green-100 text-green-800' : user.role === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{user?.role === 'admin' ? 'Admin' : user?.role === 'pending' ? 'Pending' : user?.role === 'user' ? 'User' : 'Loading...'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${user?.membershipType === 'gold' ? 'bg-yellow-300/90 text-gray-900' : 'bg-blue-100 text-blue-800'}`}>{user?.membershipType === 'gold' ? 'Gold' : user?.membershipType === 'bronze' ? 'Bronze' : 'Loading...'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <select
                                        value={user?.role === 'admin' ? 'Admin' : user?.role === 'pending' ? 'Pending' : user?.role === 'user' ? 'User' : 'Loading...'}
                                        onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select Action</option>
                                        {actionOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;
