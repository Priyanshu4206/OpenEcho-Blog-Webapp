import React from 'react'
import Signup from "../components/Signup";
import bgImg from "../assets/main_bg.jpg";

const SignupPage = () => {
    return (
        <div className='py-8 bg-no-repeat bg-cover' style={{ backgroundImage: `url(${bgImg})` }}><Signup /></div>
    )
}

export default SignupPage