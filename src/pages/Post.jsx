import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../appwrite/database";
import Container from "../components/Container";
import parse from "html-react-parser";
import Button from '../components/Button'
import { useSelector } from "react-redux";
import Loading from '../components/Loader/Loading';
import moment from "moment";
const Post = () => {
    const [post, setPost] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const deletePost = async () => {
        await service.deletePost(post.$id).then(async (status) => {
            if (status) {
                await service.deleteFile(post.featuredImage);
                toast("Deleted post SuccessFully");
                setTimeout(() => navigate("/"), 4000)
            }
        }).catch(() => {
            toast("Could not delete post");
        });
    }
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
                else {
                    navigate("*");
                }
            })
        }
    }, [slug, navigate])
    return !post ? <Loading /> : (
        <div div className='py-8' >
            <Container>
                <div className='w-full mb-6'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center mb-2 justify-center gap-8'>
                            <div className='bg-[blanchedalmond] text-black rounded-full px-4 py-2 mr-2'>{post.userName}</div>
                            <div className=''>
                                {moment(post.$createdAt).format(" MMMM D, YYYY")}
                            </div>
                        </div>
                    </div>
                    <h1 className='text-4xl md:text-7xl md:leading-snug font-bold text-center mt-5'> {post?.title}</h1>
                </div>
                <div className='relative'>
                    <img
                        src={service.getFilepreview(post.featuredImage)}
                        alt={post?.title}
                        className="my-10 md:my-20 w-full"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post?.$id}`}>
                                <Button classname='mr-3 duration-200 hover:bg-green-900' bgColor='bg-green-500'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor='bg-red-500 duration-200 hover:bg-red-900' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>
            </Container>
        </div >
    );
}

export default Post