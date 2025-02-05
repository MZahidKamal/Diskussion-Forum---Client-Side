import {useContext, useEffect, useState} from 'react';
import { FaUser, FaCrown, FaCheckCircle, FaHistory, FaStripe, FaTimes, FaCreditCard } from 'react-icons/fa';
import AuthContext from "../../../Providers/AuthContext.jsx";
import moment from "moment";


const ManageMembershipPage = () => {

    const {user: registeredUser} = useContext(AuthContext);
    const [membershipStatus, setMembershipStatus] = useState('Bronze');
    const [showPayment, setShowPayment] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([
        {
            date: '2023-05-01',
            membershipType: 'Bronze',
            paymentType: 'N/A',
            amount: 'Free',
            status: 'Active',
            endDate: 'N/A',
        },
    ]);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleMembershipChange = () => {
        setShowPayment(true);
    };


    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setShowPayment(false);
        setMembershipStatus('Gold (Pending)');
        setPaymentHistory([
            {
                date: new Date().toISOString().split('T')[0],
                membershipType: 'Gold',
                paymentType: 'Card',
                amount: '5€',
                status: 'Pending',
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            },
            ...paymentHistory,
        ]);
    };


    const renderMembershipCard = (type, price, benefits) => (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
                {type === 'Gold' ? <FaCrown className="text-yellow-500 mr-2" /> : <FaUser className="text-gray-500 mr-2" />}
                {type} Membership
            </h3>
            <p className="text-2xl font-bold mb-4">{price}</p>
            <ul className="flex-grow">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start mb-2">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
            {type === 'Gold' && membershipStatus !== 'Gold' && !showPayment && (
                <button
                    onClick={handleMembershipChange}
                    className="mt-4 bg-yellow-500 text-white px-4 rounded-md hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
                >
                    <FaStripe className="text-7xl mr-5" />
                    Upgrade to Gold
                </button>
            )}
        </div>
    );


    const renderPaymentSection = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Payment Details</h3>
                        <button
                            onClick={() => setShowPayment(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    className="h-4 w-4 text-blue-600"
                                    defaultChecked
                                />
                                <FaCreditCard className="text-blue-500" />
                                <label htmlFor="card" className="font-medium">
                                    Card
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Card number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234 1234 1234 1234"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Expiry date
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Security code
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Germany</option>
                                        <option>France</option>
                                        <option>Spain</option>
                                        <option>Italy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <input type="radio" name="paymentMethod" className="h-4 w-4" />
                                    <span className="font-medium">Klarna</span>
                                    <span className="text-sm text-gray-500">As low as €9 / month</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <input type="radio" name="paymentMethod" className="h-4 w-4" />
                                    <span className="font-medium">EPS</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <input type="radio" name="paymentMethod" className="h-4 w-4" />
                                    <span className="font-medium">Bancontact</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <input type="radio" name="paymentMethod" className="h-4 w-4" />
                                    <span className="font-medium">iDEAL</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Pay now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );


    return (
        <div className="w-full mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Membership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Name:</span> {registeredUser?.displayName || 'Loading...'}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Member Since:</span> {moment(registeredUser?.joinDate).format('LL') || 'Loading...'}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-2 flex items-center">
                            <span className="font-semibold mr-2">Status:</span>
                            <span className={`flex items-center ${registeredUser?.membershipType === 'gold' ? 'text-yellow-500' : 'text-gray-500'}`}>
                                {registeredUser?.membershipType === 'gold' ? (
                                    <FaCrown className="mr-2" />
                                ) : (
                                    <FaUser className="mr-2" />
                                )}
                                {registeredUser?.membershipType === 'bronze' ? 'Bronze' : registeredUser?.membershipType === 'gold' ? 'Gold' : 'Loading...'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {renderMembershipCard('Bronze', 'Free', [
                    'Access to all public forums',
                    'Create upto 5 posts',
                    'Reply to any topics',
                    'Basic user profile',
                ])}
                {renderMembershipCard('Gold', '5€ per month', [
                    'All Bronze benefits',
                    'Ad-free browsing experience',
                    'Unlimited posts',
                    'Exclusive access to premium forums',
                    'Advanced user profile customization',
                    'Priority support',
                ])}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <FaHistory className="mr-2" />
                    Payment History
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Membership</th>
                            <th className="py-2 px-4">Payment Type</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">End Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paymentHistory.map((payment, index) => (
                            <tr key={index} className="border-b last:border-b-0">
                                <td className="py-2 px-4">{payment.date}</td>
                                <td className="py-2 px-4">{payment.membershipType}</td>
                                <td className="py-2 px-4">{payment.paymentType}</td>
                                <td className="py-2 px-4">{payment.amount}</td>
                                <td className="py-2 px-4">{payment.status}</td>
                                <td className="py-2 px-4">{payment.endDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showPayment && renderPaymentSection()}
        </div>
    );
};


export default ManageMembershipPage;
