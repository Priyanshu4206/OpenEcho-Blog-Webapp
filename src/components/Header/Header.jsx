import React, { useState } from 'react'
import Container from "../Container";
import Logo from "../Logo";
import { useNavigate, Link } from "react-router-dom"
import LogoutBtn from "./LogoutBtn";
import { useSelector } from 'react-redux';
const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: !authStatus
        },
        {
            name: "Add Posts",
            slug: "/add-posts",
            active: authStatus
        },
    ]

    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="py-3 shadow bg-[#404ddb] w-full top-0 z-50 text-white">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="mr-4">
                        <Link to="/"><Logo /></Link>
                    </div>
                    <div className="block md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                    <ul className={`flex-col md:flex-row flex md:flex ml-auto ${menuOpen ? 'block' : 'hidden'} md:block`}>
                        {navItems.map((navItem, index) => navItem.active ? (
                            <li key={index} className="my-2 md:my-0">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate(navItem.slug);
                                    }}
                                    className="inline-block px-4 py-2 duration-200 hover:bg-[#3e6dda] rounded-lg"
                                >
                                    {navItem.name}
                                </button>
                            </li>
                        ) : null)}
                        {authStatus && (
                            <li className="my-2 md:my-0">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
};

export default Header