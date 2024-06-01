import { useNavigate } from "react-router";

export default function UpdateUser() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => navigate('/')} type="button" class="text-purple-500 border-2 border-purple-500 focus:outline-none bg-white hover:bg-purple-200 hover:text-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-purple-900">Home</button>
                </div>
                <div className="shadow-lg rounded-lg mt-4 flex justify-center flex-col gap-5 py-5">
                    <div className="bg-purple-500 text-white text-xl py-2 rounded-t-xl font-bold">
                        <span>update student</span>
                    </div>
                    <div>
                        <input className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder="Enter Your Name " />
                    </div>
                    <div>
                        <input className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="email" placeholder="Enter Your Email " />
                    </div>
                    <div>
                        <input className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="number" placeholder="Enter Your Phone " />
                    </div>
                    <div>
                        <input className="border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder="Enter Your City " />
                    </div>
                    <div className="">
                        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-10 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">save</button>
                    </div>
                </div>
            </div>
        </>
    )
}