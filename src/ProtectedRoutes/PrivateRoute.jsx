import PropTypes from "prop-types";
import {useContext} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {Navigate, useLocation} from "react-router-dom";


const PrivateRoute = ({children}) => {


    const {user, userLoading} = useContext(AuthContext);
    const location = useLocation();

    console.log(location)

    if (userLoading) {
        // Show a loading state while the user status is being determined
        return <div>Loading...</div>;
    }


    if (!user) {
        // Redirect to the login if no user is found
        return <Navigate to="/sign-in"/>;
    }


    // Render the children if the user is authenticated
    return <div>{children}</div>;
};


PrivateRoute.propTypes = {
    children: PropTypes.node,
};


export default PrivateRoute;
