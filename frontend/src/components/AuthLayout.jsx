import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setLoader } from "../context/loaderSlice";
// import PulseLoader from "react-spinners/PulseLoader";

import { useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
	//handing loading state
	// const loading = useSelector((state) => state.loading.loader);
	// const dispatch = useDispatch();

	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.user.authStatus);
	// const location = useLocation();
	/*

so, if the user is not authenticated, with the help of navigate i send them to signup but if the user is registered but not authenticated, then even if i click signin, i am still getting transferred to /signup
so, using use
*/

	useEffect(() => {
		// dispatch(setLoader(true));
		// if (!authStatus && location.pathname !== "/signin") navigate("/signup");
		if (!authStatus && location.pathname === "/chat") navigate("/signin");
		if(authStatus && (location.pathname === "/signin" || location.pathname === "/signup") ) navigate("/chat");
		// else if (authStatus) navigate("/");
		// dispatch(setLoader(false));
	}, [authStatus, navigate]);


	return (
		<>{children}</>
	) 
}

export default AuthLayout;
