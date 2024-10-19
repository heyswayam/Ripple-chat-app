import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../context/userSlice"; // Adjust the import path as needed
import axios from "axios";
import conf_env from "../conf_env/conf_env";
function AuthLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.user.authStatus);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${conf_env.backendURL}/user/check-auth`, {
                    withCredentials: true, // This is important to include cookies
                });
                if (response.status === 200) {
                    dispatch(login(response.data.data.user));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                dispatch(logout());
            }
        };

        checkAuth();
    }, [dispatch]);
    
    // TODO: remove the location.pathname==="/" condition when you have a home page
    useEffect(() => {
        if (!authStatus && (location.pathname === "/chat" || location.pathname==="/")) navigate("/signin");
        if (authStatus && (location.pathname === "/signin" || location.pathname === "/signup" || location.pathname==="/")) navigate("/chat");
    }, [authStatus, navigate, location.pathname]);

    return <>{children}</>;
}

export default AuthLayout;