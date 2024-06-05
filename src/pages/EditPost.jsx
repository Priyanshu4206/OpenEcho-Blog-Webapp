import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from "../appwrite/database";
import Container from '../components/Container';
import PostForm from "../components/post-form/PostForm";
import Loading from '../components/Loader/Loading';
const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect((() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
                else {
                    navigate('/');
                }
            })
        }
    }), [slug, navigate]);

    return post ? (
        <div className='py-4 md:py-8 lg:py-16'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>) : (<Loading />)
}

export default EditPost