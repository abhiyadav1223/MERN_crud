import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            let resp = axios.post('http://localhost:9800/signup', { userId: data.email, password: data.password });
            let rsp = await resp;
            alert(rsp.data);
            navigate('/');
        } catch (er) {
            console.log(er);
        }
    };

    return (
        <>
            <div className="shadow-lg w-[40rem] mx-auto flex flex-col gap-8 mt-44 rounded-xl">
                <div className="bg-purple-500 text-2xl font-bold rounded-t-xl text-white py-2">
                    <span>Sign Up</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-4">
                    <div>
                        <input
                            className={`border-b-2 text-lg placeholder:text-black w-96 px-2 py-1 ${errors.email ? 'border-red-500' : 'border-purple-500'}`}
                            type="text"
                            placeholder="Enter email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input
                            className={`placeholder:text-black border-b-2 text-lg w-96 px-2 py-1 ${errors.password ? 'border-red-500' : 'border-purple-500'}`}
                            type="password"
                            placeholder="Create password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <input
                            className={`placeholder:text-black border-b-2 text-lg w-96 px-2 py-1 ${errors.confirmPassword ? 'border-red-500' : 'border-purple-500'}`}
                            type="password"
                            placeholder="Confirm password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value =>
                                    value === watch('password') || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <div>
                        <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Sign Up
                        </button>
                    </div>
                    <div>
                        <a className="text-sky-600 underline hover:text-red-600" href="/">Login</a>
                    </div>
                </form>
            </div>
        </>
    );
}
