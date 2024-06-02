export default function SignUp() {
    return (
        <>
            <div className="shadow-lg w-[40rem] mx-auto flex flex-col gap-8 mt-44 rounded-xl">
                <div className="bg-purple-500 text-2xl font-bold rounded-t-xl text-white py-2">
                    <span>Sign Up</span>
                </div>
                <div className=" flex flex-col gap-5 py-4">
                    <div>
                        <input className="border-b-2 text-lg placeholder:text-black border-purple-500 w-96 px-2 py-1" type="text" placeholder="enter email" />
                    </div>
                    <div>
                        <input className="placeholder:text-black border-b-2 text-lg border-purple-500 w-96 px-2 py-1" type="password" placeholder="create password" />
                    </div>
                    <div>
                        <input className="placeholder:text-black border-b-2 text-lg border-purple-500 w-96 px-2 py-1" type="password" placeholder="confirm password" />
                    </div>
                    <div>
                        <button onClick={() => navigate('/add')} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">sign up</button>
                    </div>
                    <div>
                        <a className="text-sky-600 underline hover:text-red-600" href="/">Login</a>
                    </div>
                </div>
            </div>
        </>
    )
}