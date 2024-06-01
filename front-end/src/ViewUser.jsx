import { split } from "postcss/lib/list";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ViewUser() {
    const navigate = useNavigate();
    const getData = useLocation();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(getData.state);
    }, []);
    return (
        <>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => navigate('/')} type="button" className="text-purple-500 border-2 border-purple-500 focus:outline-none bg-white hover:bg-purple-200 hover:text-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-purple-900">Home</button>
                </div>
                <div className="shadow-lg rounded-lg mt-4 flex justify-center flex-col gap-5 py-5 font-bold">
                    <div className="bg-purple-500 text-white text-xl py-2 rounded-t-xl font-bold">
                        <span>{"hello there..." || data.name.split(" ")[0]}</span>
                    </div>
                    <div>
                        <input value={data.id} disabled className="disabled:bg-white border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder="ID " />
                    </div>
                    <div>
                        <input value={data.name} disabled className="disabled:bg-white border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder=" Name " />
                    </div>
                    <div>
                        <input value={data.email} disabled className="disabled:bg-white border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="email" placeholder=" Email " />
                    </div>
                    <div>
                        <input value={data.phone} disabled className="disabled:bg-white border-b-2 text-lg border-purple-500 w-96 px-2 py-1  text-center" type="number" placeholder=" Phone " />
                    </div>
                    <div>
                        <input value={data.city} disabled className="border-b-2 text-lg disabled:bg-white border-purple-500 w-96 px-2 py-1  text-center" type="text" placeholder=" City " />
                    </div>
                </div>
            </div>
        </>
    )
}