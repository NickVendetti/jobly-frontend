import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

function PrivateRoute({ currentUser, children }) {
  return currentUser ? children : <Navigate to="/login" />;
}

// Ensure default export is added
export default PrivateRoute;

//  Add prop validation
PrivateRoute.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.node.isRequired
};