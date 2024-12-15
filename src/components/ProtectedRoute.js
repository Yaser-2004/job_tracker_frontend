import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    // If no user is found, redirect to the login page
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return children; 
};

export default ProtectedRoute;
