import React from 'react'

const Container = ({ children }) => {
    return (
        <section className='w-full max-w-7xl mx-auto px-4 bg-transparent'>{children}</section>
    )
}

export default Container