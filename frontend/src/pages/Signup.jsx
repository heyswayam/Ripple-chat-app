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
import { PulseLoader } from "react-spinners";


function Signup() {
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
            const res = await axios.post(`${conf_env.backendURL}/user/register`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            // console.log(res.data.data);
            // console.log(data);
            
            toast.success("Signup successful!");
            // navigate("/signin");
        } catch (error) {
            console.error("Response error:", error.response.data);
            toast.error("Signup failed. " + error.response.data.message);
        } finally {
            dispatch(setLoader(false));
        }
    };

    return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-center'>
          <p className='text-2xl text-white'>Welcome to Ripple</p>
          <p className='text-gray-400 mt-5'>Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative mt-4'>
            <input
              {...register("fullname", { required: "Full name is required" })}
              type='text'
              id='floating_fullname'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-600 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0  peer'
              placeholder=' '
            />
            <label
              htmlFor='floating_fullname'
              className='absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f2937] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Full Name
            </label>
            {errors.fullname && <span className='text-red-500 text-xs'>{errors.fullname.message}</span>}
          </div>

          <div className='relative mt-4'>
            <input
              {...register("username", { required: "Username is required" })}
              type='text'
              id='floating_username'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-600 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0  peer'
              placeholder=' '
            />
            <label
              htmlFor='floating_username'
              className='absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f2937] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Username
            </label>
            {errors.username && <span className='text-red-500 text-xs'>{errors.username.message}</span>}
          </div>

          <div className='relative mt-4'>
            <input
              {...register("email", { required: "Email is required" })}
              type='email'
              id='floating_email'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-600 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 peer'
              placeholder=' '
            />
            <label
              htmlFor='floating_email'
              className='absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f2937] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
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
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-600 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0  peer'
              placeholder=' '
            />
            <label
              htmlFor='floating_password'
              className='absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f2937] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Password
            </label>
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer' onClick={handlePasswordVisibility}>
              {/* SVG for password visibility toggle */}
            </span>
          </div>

          <div className='mt-4'>
            <label className='block text-sm text-gray-400'>Gender</label>
            <div className='flex items-center mt-2'>
              <input
                {...register("gender", { required: "Gender is required" })}
                type='radio'
                id='male'
                value='male'
                className='mr-2'
              />
              <label htmlFor='male' className='mr-4 text-white'>Male</label>
              <input
                {...register("gender", { required: "Gender is required" })}
                type='radio'
                id='female'
                value='female'
                className='mr-2'
              />
              <label htmlFor='female' className='text-white'>Female</label>
            </div>
            {errors.gender && <span className='text-red-500 text-xs'>{errors.gender.message}</span>}
          </div>

          <button type='submit' className='w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75' disabled={loading}>
            {loading ? (
              <>
                Signing up... <PulseLoader color='#f3f4f6' size={8} />
              </>
            ) : (
              "Sign up"
            )}
          </button>
          <p className='mt-4 text-center text-sm text-gray-300'>
            Already have an account?{" "}
            <Link to='/signin' className='underline text-indigo-400'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
    );
}

export default Signup;