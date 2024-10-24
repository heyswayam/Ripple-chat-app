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
import { PulseLoader } from "react-spinners";

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
			const res = await axios.post(`${conf_env.backendURL}/user/login`, data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			dispatch(login(res.data.data.user));
			toast.success("Signin successful!");
			// console.log(res.data.data);
			navigate("/chat");
		} catch (error) {
			console.error("Response error:", error.response.data);

			toast.error("Login failed. " + error.response.data.message);
		} finally {
			dispatch(setLoader(false));
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-900'>
			<div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md -translate-y-3 mx-4'>
				<div className='text-center'>
					<p className='text-2xl text-white'>Welcome to Ripple</p>
					<p className='text-gray-400 mt-5'>Sign in to continue</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='relative mt-4'>
						<input
							{...register("email", { required: "Email is required" })}
							type='email'
							id='floating_email'
							className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-600 appearance-none text-white focus:border-blue-500 focus:outline-none focus:ring-0 peer'
							placeholder=' '
							required
						/>
						<label
							htmlFor='floating_email'
							className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3.5 z-10 origin-[0] bg-gray-800 px-2  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-1'
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
							className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-600 appearance-none text-white focus:border-blue-500 focus:outline-none focus:ring-0 peer'
							placeholder=' '
							required
						/>
						<label
							htmlFor='floating_password'
							className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3.5 z-10 origin-[0] bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-1'
						>
							Password
						</label>
						{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
						<span className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer' onClick={handlePasswordVisibility}>
							{/* SVG for password visibility toggle */}
						</span>
					</div>

					<button type='submit' className='w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' disabled={loading}>
						{loading ? (
							<>
								Signing in <PulseLoader color='#f3f4f6' size={8} />
							</>
						) : (
							"Sign in"
						)}{" "}
					</button>
					<p className='mt-4 text-center text-sm text-gray-300'>
						Don't have an account?{" "}
						<Link to='/signup' className='underline text-indigo-400'>
							Sign up
						</Link>
					</p>
				</form>
			</div>
			<span className='text-sm mx-auto text-center text-gray-400 absolute bottom-0 '>
				<a href='https://github.com/heyswayam' className='hover:underline'>
					<span>Made with</span>
					<span className='font-handwriting text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500'> Love </span> <span>by Swayam</span>
				</a>
			</span>
		</div>
	);
}

export default Signin;
