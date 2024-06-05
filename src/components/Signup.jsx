import React from 'react'
import Button from "./Button";
import Input from "./Input";
import gif from "../assets/signup_gif.gif";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const createUser = async (data) => {
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                dispatch(login({ userData }));
                toast.success("Account created Successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 4000);
            }
        }
        catch (e) {
            toast.error(e.message);
        }
    }
    return (
        <div className=' flex items-center justify-center min-h-screen'>
            <ToastContainer />
            <div className='flex flex-col justify-center items-center relative mx-auto w-full max-w-[800px] bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-10 border border-white/30 shadow-lg '>
                <div className='mr-4'>
                    <img src={gif} alt="Animated GIF" className='w-40 h-40' />
                </div>
                <div>
                    <h2 className='text-center text-2xl font-bold leading-tight text-sky-700'>
                        Sign up to Create Account
                    </h2>
                    <p className='mt-2 text-center text-base text-sky-600'>
                        Already have an Account?&nbsp;
                        <Link to="/login" className='font-medium text-sky-700 transition-all duration-200 hover:underline'>
                            Sign In
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit(createUser)} className='mt-8'>
                        <div className='flex flex-wrap gap-5'>
                            <div className='w-full sm:w-[48.5%]'>
                                <Input
                                    {...register("name", { required: true })}
                                    label="Full Name :"
                                    placeholder="Full Name"
                                    classname="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div className='w-full sm:w-[48.5%]'>
                                <Input
                                    {...register("email", { required: true })}
                                    label="Email :"
                                    placeholder="Email Address"
                                    type="email"
                                    classname="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div className='w-full'>
                                <Input
                                    {...register("password", { required: true })}
                                    label="Password :"
                                    placeholder="Password"
                                    type="password"
                                    classname="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <Button
                                type='submit'
                                classname='w-full py-2 bg-sky-600 text-white rounded-md transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup