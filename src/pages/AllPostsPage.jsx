import React, { useEffect, useState } from 'react'
import service from '../appwrite/database'
import Container from '../components/Container';
import PostCard from "../components/PostCard";
import Loading from '../components/Loader/Loading';
const AllpostsPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
    }, []);
    return (
        <div className='w-full py-4 md:py-8 lg:py-16 '>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length === 0 ? (<Loading />) : posts.map((post) => (
                        <div key={post.$id} className='p-2 w1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllpostsPage