import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { setLoader } from "../context/loaderSlice";
import logo from "../assets/logo.svg"; // Add your logo here
import conf_env from "../conf_env/conf_env.js";
import api from "../utils/api.js"; // Import the configured axios instance
import axios from "axios";
import { login } from "../context/userSlice.js";

function Signin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.loading.loader);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handlePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const onSubmit = async (data) => {
		dispatch(setLoader(true));
		try {
			const res = await axios.post(`http://localhost:8100/users/login`, data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			dispatch(login(res.data.data.user));
			toast.success("Signin successful!");
			console.log(res.data.data);
		} catch (error) {
			console.error("Response error:", error.response.data);

			toast.error("Login failed. " + error.response.data.message);
		} finally {
			dispatch(setLoader(false));
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
				<div className='text-center '>
					<p className='text-2xl text-gray-900 dark:text-white'>Welcome to Ripple</p>
					<p className='text-gray-600 dark:text-gray-400 mt-5'>Sign in to continue</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='relative mt-4'>
						<input
							{...register("email", { required: "Email is required" })}
							type='email'
							id='floating_email'
							className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
						/>
						<label
							htmlFor='floating_email'
							className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
						>
							Email
						</label>
						{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
					</div>

					<div className='relative mt-4'>
						<input
							{...register("password", { required: "Password is required" })}
							type={passwordVisible ? "text" : "password"}
							id='floating_password'
							className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
						/>
						<label
							htmlFor='floating_password'
							className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
						>
							Password
						</label>
						{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
						<span className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer' onClick={handlePasswordVisibility}>
							{/* SVG for password visibility toggle */}
						</span>
					</div>
					<button type='submit' className='w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75' disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</button>
					<p className='mt-4 text-center text-sm text-gray-500 dark:text-gray-300'>
						Don't have an account?{" "}
						<Link to='/signup' className='underline text-blue-600 dark:text-indigo-400'>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signin;
