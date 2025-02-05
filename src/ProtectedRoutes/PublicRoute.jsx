import PropTypes from "prop-types";
import {useContext} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {Navigate} from "react-router-dom";


const PublicRoute = ({children}) => {

    const {user} = useContext(AuthContext);


    if (user) {
        return <Navigate to="/" replace />; // Redirect logged-in users to homepage or dashboard
    }


    // Render the children if the user is not authenticated
    return <div>{children}</div>;
};


PublicRoute.propTypes = {
    children: PropTypes.node,
}


export default PublicRoute;
