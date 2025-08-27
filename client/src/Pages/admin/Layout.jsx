import { Outlet } from "react-router-dom";
import React, { useEffect } from 'react'
import AdminNavBar from '../../Components/admin/AdminNavBar'
import AdminSideBar from '../../Components/admin/adminSideBar'
import { useAppContext } from "../../context/AppContext";
import Loading from "../../Components/Loading";

const LayOut = () => {
  const {isAdmin,fetchIsAdmin} = useAppContext();
  

  useEffect(()=>{
    fetchIsAdmin()},[])

  return isAdmin?  (
    <>
      <AdminNavBar/>
      <div className="flex">
        <AdminSideBar/>
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ):<Loading/>;
} 

export default LayOut
