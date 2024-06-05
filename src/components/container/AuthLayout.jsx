import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// This is a wrapper that allows only authenticated user to access the wrapped components
function Protected({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        /* 
            Authentication for the page is required but user is not logged in than it means we need to go to login page
        */
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        }
        /* 
            Authentication for the page is not required and also the user is logged in than it means we need to go to Home page sinve u r not suppose to se pages like Login page and signup page if u already have an account
        */
        else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication]);
    return loader ? null : (
        <>
            {children}
        </>
    )
}

export default Protected
