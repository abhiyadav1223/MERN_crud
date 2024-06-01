import UserList from "./userList";

export default function HomePage() {

    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="bg-purple-600 drop-shadow-lg shadow-grey-500 shadow-lg text-white font-bold text-4xl p-2 rounded-lg">
                    <span>Student Mangement System</span>
                </div>
                <div className="flex justify-around">
                    <div>
                        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add student</button>
                    </div>
                    <div>
                        <input type="text" placeholder="search..." />
                    </div>
                </div>
                <div>
                    <UserList />
                </div>
            </div>
        </>
    )
}