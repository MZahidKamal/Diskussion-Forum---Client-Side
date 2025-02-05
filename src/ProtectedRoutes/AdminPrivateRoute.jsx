import PropTypes from "prop-types";
import {useContext} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {Navigate} from "react-router-dom";


const AdminPrivateRoute = ({children}) => {

    const {user, userLoading, signOutCurrentUser} = useContext(AuthContext);


    if (userLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }


    if (user && user?.role !== 'admin') {
        signOutCurrentUser();
        return <Navigate to="/user-dashboard" replace/>;
    }


    if (!user) {
        return <Navigate to="/sign-in" replace/>;
    }


    return children;
};


AdminPrivateRoute.propTypes = {
    children: PropTypes.node,
};


export default AdminPrivateRoute;
