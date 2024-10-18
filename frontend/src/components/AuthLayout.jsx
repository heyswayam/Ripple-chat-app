import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function AuthLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const authStatus = useSelector((state) => state.user.authStatus);

    useEffect(() => {
        if (!authStatus && location.pathname === "/chat") navigate("/signin");
        if (authStatus && (location.pathname === "/signin" || location.pathname === "/signup")) navigate("/chat");
    }, [authStatus, navigate, location.pathname]);

    return <>{children}</>;
}

export default AuthLayout;