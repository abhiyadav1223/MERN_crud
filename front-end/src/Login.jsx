import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from './store/userData'

export default function Login() {
    const dispatch = useDispatch();
    const [Id, setId] = useState();
    const [pass, setPass] = useState();
    const [respMsg, setMsg] = useState();
    const navigate = useNavigate();
    const loginUser = async () => {
        try {
            let obj = {
                userId: Id,
                password: pass
            }
            if (obj.userId && obj.password) {
                let resp = await axios.post('http://localhost:9800/login', obj);
                let userObj = { token: resp.data.token, userId: resp.data.data[0].userId }
                dispatch(addUser(userObj))
                setMsg(resp.data.message);
                navigate('/home')
            } else {
                setMsg("Enter Id and Password")
            }
        } catch (er) {
            if (er.response) {
                setMsg(er.response.data.message);
            } else {
                console.log("An error occurred:", er.message);
            }
        }
    }
    return (
        <>
            <div className="shadow-lg w-[40rem] mx-auto flex flex-col gap-8 mt-32 rounded-xl">
                <div className="bg-purple-500 text-2xl font-bold rounded-t-xl text-white py-2">
                    <span>Login</span>
                </div>
                <div className=" flex flex-col gap-5 py-4">
                    <div>
                        <input onInput={(e) => setId(e.target.value)} className="border-b-2 text-lg placeholder:text-black border-purple-500 w-96 px-2 py-1" type="text" placeholder="enter email" />
                    </div>
                    <div>
                        <input onInput={(e) => setPass(e.target.value)} className="placeholder:text-black border-b-2 text-lg border-purple-500 w-96 px-2 py-1" type="password" placeholder="enter password" />
                    </div>
                    <span>{respMsg}</span>
                    <div>
                        <button onClick={loginUser} type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Login</button>
                    </div>
                    <div>
                        <a className="text-sky-600 underline hover:text-red-600" href="/signup">Sign up</a>
                    </div>
                </div>
            </div>
        </>
    )
}