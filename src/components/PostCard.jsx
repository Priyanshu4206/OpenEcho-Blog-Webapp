import React from 'react';
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import moment from "moment";
import service from '../appwrite/database';

const PostCard = ({ $id, title, featuredImage, status = "active", userName, $createdAt, classname = "" }) => {

    const createdDate = moment($createdAt).format(" MMMM D YYYY");
    return (
        <Link to={`/post/${$id}`} className='block h-full'>
            <div className={`w-full h-full rounded-xl p-4 flex ${classname} gap-4`}>
                <div className='flex justify-center sm:mr-4 mb-4 sm:mb-0 flex-1 '>
                    <img
                        src={service.getFilepreview(featuredImage)}
                        alt={title}
                        className='rounded-lg sm:rounded-xl w-full sm:w-full sm:h-full'
                    />
                </div>
                <div className='flex flex-col justify-evenly flex-1'>
                    <div className='flex items-center mb-2'>
                        <div className={`${status === "active" ? "bg-green-500" : "bg-red-500"} text-white rounded-full px-4 py-1 mr-2`}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                        <div>{getRandomReadTime()} min read</div>
                    </div>
                    <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                    <div className='flex items-center'>
                        <div className='rounded-full bg-[blanchedalmond] p-1 mr-2 text-[2.5rem] text-orange-400 '>
                            <BsFillPersonFill />
                        </div>
                        <div>
                            <div className='font-semibold'>{userName}</div>
                            <div className='text-gray-500'>{createdDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    )
}

const getRandomReadTime = () => {
    return Math.floor(Math.random() * 10) + 1;
}

export default PostCard;
