import React from 'react'
import coverPhoto from "../assets/newsletter_cover_photo.jpg";
const NewsLetter = () => {
    return (
        <div className="my-16 bg-cover bg-center h-[50vh] flex items-center justify-center " style={{ backgroundImage: `url(${coverPhoto})` }}>
            <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-lg flex items-center">
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                <button className="bg-sky-600 text-white px-4 py-2 rounded-r-md transition-transform duration-200 transform hover:scale-105 active:scale-95">Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter