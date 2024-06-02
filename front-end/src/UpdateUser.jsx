import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export default function UpdateUser() {
    const token = useSelector(state => state.data.userDetail.token);

    const [btnTxt, setBtnTxt] = useState("submit")
    const [User, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        city: ''
    })
    const navigate = useNavigate();
    const currentUser = useLocation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        setUser(currentUser.state);
        reset(currentUser.state);
    }, [currentUser.reset, reset]);

    const onSubmitData = async (data) => {
        try {
            let resp = axios.put(`http://localhost:9800/updateuser/${data._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let resData = await resp;
            setBtnTxt(resData.data);
        } catch (er) {
            if(er.response.status == 498){
                navigate('/')
            }
            console.log(er);
        }
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }
    return (
        <>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => navigate('/home')} type="button" className="text-purple-500 border-2 border-purple-500 focus:outline-none bg-white hover:bg-purple-200 hover:text-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-purple-900">Home</button>
                </div>
                <form onSubmit={handleSubmit(onSubmitData)}>
                    <div className="shadow-lg rounded-lg mt-4 flex justify-center flex-col gap-5 py-5">
                        <div className="bg-purple-500 text-white text-xl py-2 rounded-t-xl font-bold">
                            <span>add student</span>
                        </div>
                        <div>
                            <input disabled value={User.id} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" placeholder="Enter Your Name " />
                        </div>
                        <div>
                            <input value={User.name} onInput={handleInput} {...register('name', { required: 'Name is required' })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" placeholder="Enter Your Name " />
                        </div>
                        {errors.name && <span>{errors.name.message}</span>}
                        <div>
                            <input onInput={handleInput} value={User.email} {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Email is not valid'
                                },
                            })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" placeholder="Enter Your Email " />
                        </div>
                        {errors.email && <span>{errors.email.message}</span>}
                        <div>
                            <input onInput={handleInput} value={User.phone}  {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be 10 digits',
                                },
                            })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="number" placeholder="Enter Your Phone " />
                        </div>
                        {errors.phone && <span>{errors.phone.message}</span>}
                        <div>
                            <input onInput={handleInput} value={User.city} {...register('city', { required: 'city is required' })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder="Enter Your City " />
                        </div>
                        {errors.city && <span>{errors.city.message}</span>}
                        <div className="">
                            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-10 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{btnTxt}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}