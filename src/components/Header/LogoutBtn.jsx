import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        /* 
            logout API is called if it is sccessful than the session is terminated of the user and dispatch method and the user data is removed from the store
        */
        authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        }).catch((error) => {
            console.error(error);
        })
    }
    return (
        <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
            Logout
        </button>
    )
}

export default LogoutBtn