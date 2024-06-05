import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';
const Footer = () => {
    return (
        <footer className="bg-[#404ddb] text-white py-8 pb-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2"><Logo /></h3>
                        <p className="text-sm">Create, Explore, and Connect through Blogging.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/about" className="hover:underline">About</Link></li>
                            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Resources</h3>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/all-posts" className="hover:underline">Blog</Link></li>
                            <li><Link to="/" className="hover:underline">Guides</Link></li>
                            <li><Link to="/contact" className="hover:underline">Support</Link></li>
                            <li><Link to="/policy" className="hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/" className="hover:underline">Instagram</Link></li>
                            <li><Link to="/" className="hover:underline">LinkedIn</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Priyanshu Agarwal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
