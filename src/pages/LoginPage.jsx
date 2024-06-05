import React from 'react'
import Login from "../components/Login";
import bgImg from "../assets/main_bg.jpg";
const LoginPage = () => {
    return (
        <div className='py-8 bg-no-repeat bg-cover' style={{ backgroundImage: `url(${bgImg})` }}>
            <Login />
        </div>
    )
}

export default LoginPage