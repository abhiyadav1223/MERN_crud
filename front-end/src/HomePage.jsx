import React, { Suspense } from "react";
import UserList from "./userList";
export default function HomePage() {
    return (
        <>
            <div className="flex flex-col gap-14">
                <div className="bg-purple-600 drop-shadow-lg shadow-grey-500 shadow-lg text-white font-bold text-4xl p-2 rounded-lg">
                    <span>Student Mangement System</span>
                </div>
                <div>
                    {/* <UserList /> */}
                </div>
            </div>
        </>
    )
}