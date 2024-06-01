import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"

export default function AddUser() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmitData = async (data) => {
        try {
            let lastId = axios.get("http://localhost:9800/lastid");
            // let data = await axios.post("http://localhost:9800/insertnewuser", { lastId, ...data })
            console.log({ lastId, ...data });
        } catch (er) {
            console.log(er);
        }
    };
    return (
        <>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => navigate('/')} type="button" className="text-purple-500 border-2 border-purple-500 focus:outline-none bg-white hover:bg-purple-200 hover:text-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-purple-900">Home</button>
                </div>
                <form onSubmit={handleSubmit(onSubmitData)}>
                    <div className="shadow-lg rounded-lg mt-4 flex justify-center flex-col gap-5 py-5">
                        <div className="bg-purple-500 text-white text-xl py-2 rounded-t-xl font-bold">
                            <span>add student</span>
                        </div>
                        <div>
                            <input {...register('name', { required: 'Name is required' })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" placeholder="Enter Your Name " />
                        </div>
                        {errors.name && <span>{errors.name.message}</span>}
                        <div>
                            <input {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Email is not valid'
                                },
                            })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" placeholder="Enter Your Email " />
                        </div>
                        {errors.email && <span>{errors.email.message}</span>}
                        <div>
                            <input  {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be 10 digits',
                                },
                            })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="number" placeholder="Enter Your Phone " />
                        </div>
                        {errors.phone && <span>{errors.phone.message}</span>}
                        <div>
                            <input {...register('city', { required: 'city is required' })} className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder="Enter Your City " />
                        </div>
                        {errors.name && <span>{errors.city.message}</span>}
                        <div className="">
                            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-10 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}