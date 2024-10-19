import { useEffect } from "react";
import "./App.css";

import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import refreshToken from "./utils/Auth";
import { useDispatch, useSelector } from 'react-redux';
function App() {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.user.authStatus);

    useEffect(() => {
        if (authStatus) {
            console.log('App.js: useEffect refreshToken');
            refreshToken(dispatch);
        }
    }, [authStatus, dispatch]);

	return (
		<>
			<Toaster expand={true} richColors closeButton={true} />
			<Outlet />
		</>
	);
}

export default App;
