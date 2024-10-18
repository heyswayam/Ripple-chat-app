import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { store } from "./context/store.js";
import { Provider } from "react-redux";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/signin",
                element: (
                    <AuthLayout>
                        <Signin />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout>
                        <Signup/>
                    </AuthLayout>
                ),
            },
            {
                path: "/chat",
                element: (
                    <AuthLayout>
                        <Chat/>
                    </AuthLayout>
                ),
                
            },
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);