import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import UserLayout from "./UserLayout";

export default function PrivateRoute(){
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? 
    // <UserLayout>
        <Outlet /> 
    // </UserLayout>
    : <Navigate to="/login" replace/>
}