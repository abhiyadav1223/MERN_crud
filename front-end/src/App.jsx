import './App.css'
import HomePage from './HomePage'
import Login from './Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./userList";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import SignUp from "./SignUp";
function App() {

  return (
    <>
      <HomePage />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<UserList />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/view' element={<ViewUser />} />
          <Route path='/edit' element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
