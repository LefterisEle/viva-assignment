import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
            <h1 className='text-3xl font-bold mb-4'>
                I couldn't find this page
            </h1>
            <Link to='/' className='text-primary hover:underline'>
                Go back to the home page
            </Link>
        </div>
    );
};

export default NotFound;
