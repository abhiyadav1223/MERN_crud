import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function UserList() {

    const token = useSelector(state => state.data.userDetail.token);
    // console.log(token);
    const [users, setUsers] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [error, setError] = useState(" ");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:9800/dashboard")
            .then((data) => {
                setSearchData(data.data)
                return setUsers(data.data)
            })
            .catch((er) => {
                console.log(er);
            })
    }, []);

    const seacrhUser = async (event) => {
        try {
            let key = event.target.value;
            if (key != 0) {
                let resp = await axios.get(`http://localhost:9800/search/${key}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (resp.data.length !== 0) {
                    setUsers(resp.data);
                    setError(' ');
                } else {
                    setUsers([]);
                    setError("Not Found");
                }
            } else {
                setError(' ');
                setUsers(searchData);
            }
        }
        catch (er) {
            setError("Not Found");
            if (er.response.status == 498) {
                navigate('/')
            }
        }

    }
    const deleteUser = async (id) => {
        try {
            let conf = confirm("are you sure want to delete ?")
            if (conf) {
                let data = await axios.delete(`http://localhost:9800/removeuser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert(data.data.msg);
                setUsers(data.data.returnData);
            }
        } catch (er) {
            console.log(er);
            if (er.response.status == 498) {
                navigate('/')
            }
        }
    }

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex justify-evenly gap-[44rem] ">
                    <div>
                        <button onClick={() => navigate('/add')} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add student</button>
                    </div>
                    <div>
                        <input onInput={(event) => seacrhUser(event)} className="border-2 text-lg border-purple-500 w-96 px-2 py-1  text-center rounded-md" type="text" placeholder="search..." />
                    </div>
                </div>
                <div className="relative overflow-x-auto sm:rounded-lg shadow-xl">
                    <table className=" w-full text-sm text-left rtl:text-right text-black dark:text-black font-bold">
                        <thead className=" border-b-2 border-purple-600 text-xs text-gray-700 uppercase bg-white dark:bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {users.map((item) => {
                                return <tr key={item.id} className="bg-white border-b-2 border-purple-300 dark:bg-white hover:bg-grey-200 dark:hover:bg-grey-300">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                        {item.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td scope="col" className="px-6 py-3 cursor-pointer">
                                        <svg onClick={() => navigate('/view', { state: item })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:animate-ping">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </td>
                                    <td scope="col" className="px-6 py-3">
                                        <svg onClick={() => navigate('/edit', { state: item })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:animate-ping cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>

                                    </td>
                                    <td scope="col" className="px-6 py-3">
                                        <svg onClick={() => deleteUser(item._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:animate-ping cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {<span>{error}</span>}
                </div>

            </div>
        </>
    )
}