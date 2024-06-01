import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./userList";
import AddUser from "./AddUser";
// import ViewUser from "./ViewUser";
const ViewUser = React.lazy(() => import('./ViewUser'));
import UpdateUser from "./UpdateUser";

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col gap-14">
                <div className="bg-purple-600 drop-shadow-lg shadow-grey-500 shadow-lg text-white font-bold text-4xl p-2 rounded-lg">
                    <span>Student Mangement System</span>
                </div>
                <div>
                    <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path='/' element={<UserList />} />
                            <Route path='/add' element={<AddUser />} />
                            <Route path='/view' element={<ViewUser />} />
                            <Route path='/edit' element={<UpdateUser />} />
                        </Routes>
                    </Suspense>
                    </BrowserRouter>
                </div>
            </div>
        </>
    )
}