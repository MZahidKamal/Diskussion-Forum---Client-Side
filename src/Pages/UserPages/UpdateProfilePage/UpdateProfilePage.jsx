import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCamera } from 'react-icons/fa';
import AuthContext from "../../../Providers/AuthContext.jsx";
import {uploadImageToImageServerAndGetUrl} from "../../../SharedUtilities/SharedUtilities.jsx";


const UpdateProfilePage = () => {

    const {user: registeredUser, updateExistingUsers} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: '',
        photoUrl: '',
    });
    const [fileInfo, setFileInfo] = useState(null);
    const navigate = useNavigate();


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        // Simulating fetching user data
        const fetchUserData = () => {
            const userData = {
                fullName: registeredUser?.displayName || '',
                photoUrl: registeredUser?.photoURL || '',
            };
            setFormData(userData);
        };
        fetchUserData();
    }, [registeredUser]);


    const handleAvatarChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photoUrl: reader.result})
            };
            reader.readAsDataURL(file);

            const url = await uploadImageToImageServerAndGetUrl(file);
            // console.log(url);
            setFormData({...formData, photoUrl: url})

            setFileInfo({
                name: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB'
            });
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        /* UPDATING PROFILE THROUGH FIREBASE */
        await updateExistingUsers(formData.fullName, formData.photoUrl);

        if (registeredUser?.role === 'admin') {
            navigate('/admin-dashboard/admin-profile');
        }
        if (registeredUser?.role === 'user') {
            navigate('/user-dashboard/user-profile');
        }
    };


    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                        <img
                            src={formData?.photoUrl}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors"><FaCamera className="w-4 h-4" /></label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>
                    {fileInfo && (<p className="text-sm text-gray-500 mt-2">{fileInfo.name} ({fileInfo.size})</p>)}
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                            required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};


export default UpdateProfilePage;
