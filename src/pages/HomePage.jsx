import React, { useEffect, useState } from 'react';
import service from '../appwrite/database';
import Container from '../components/Container';
import PostCard from "../components/PostCard";
import Loading from '../components/Loader/Loading';
import NewsLetter from "../components/NewsLetter";

const HomePage = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setAllPosts(posts.documents);
                const sortedPosts = posts.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                setRecentPosts(sortedPosts);
            }
        });
    }, []);

    return (
        <div className='w-full py-4 md:py-8 lg:py-16'>
            <Container>
                {allPosts.length > 0 && recentPosts.length > 0 ? (
                    <div className="min-h-screen p-4">
                        <div className="text-center mb-[5rem]">
                            <h1 className="text-4xl font-bold text-sky-700">Stories and Ideas</h1>
                            <p className="text-lg text-sky-600 mt-2">Create, Explore, and Connect through Blogging.</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8 mb-16">
                            <div className="w-full lg:w-1/2 bg-white border border-gray-300 p-4 rounded-lg shadow-lg">
                                <PostCard {...recentPosts[0]} classname='flex-col' />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                                {recentPosts.slice(1).map((post) => (
                                    <div key={post.$id} className="lg:border-none border border-gray-300 p-4 rounded-lg shadow-lg lg:shadow-none">
                                        <PostCard {...post} classname='flex-col sm:flex-row' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="my-8">
                            <h2 className="text-2xl font-bold text-sky-700 mb-4 text-center">All Blogs</h2>
                            <div className="flex flex-wrap">
                                {allPosts.length === 0 ? (
                                    <Loading />
                                ) : (
                                    allPosts.slice(0, 6).map((post) => (
                                        <div key={post.$id} className="p-2 flex-1 min-w-[320px]">
                                            <PostCard {...post} classname='flex-col' />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </Container>
            <NewsLetter />

        </div>
    );
};

export default HomePage;
