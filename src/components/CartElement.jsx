import React, { useEffect, useState } from 'react';

const CartElement = ({ cartProduct, updateQuantity, subtractQuantity }) => {
    const [isClicked, setIsClicked] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsClicked(false);
        }, 10000);
    }, []);

    return (
        <div
            key={cartProduct.cartID}
            className={`${
                isClicked ? null : 'max-w-[50px] px-2 py-1'
            }  border 2 rounded-xl  flex justify-between px-2 py-1 bg-gray-100 bg-opacity-80 hover:bg-opacity-90`}
            onClick={() => setIsClicked(!isClicked)}
            onMouseLeave={() => setIsClicked(false)}
        >
            {isClicked ? (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            subtractQuantity(cartProduct.cartID);
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5 rounded-full hover:bg-gray-300 mx-2'
                        >
                            <path d='M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z' />
                        </svg>
                    </button>
                    <p className='text-sm font-bold'>
                        {cartProduct.quantity === 500
                            ? `${cartProduct.quantity}gr`
                            : `${cartProduct.quantity / 1000}kg`}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(cartProduct.cartID, 500);
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5 rounded-full hover:bg-gray-300 mx-2'
                        >
                            <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
                        </svg>
                    </button>
                </>
            ) : (
                <div className=''>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5 text-primary'
                    >
                        <g clipPath='url(#clip0_9_2121)'>
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.25-7.25a.75.75 0 000-1.5H8.66l2.1-1.95a.75.75 0 10-1.02-1.1l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 001.02-1.1l-2.1-1.95h4.59z'
                                clipRule='evenodd'
                            />
                        </g>
                        <defs>
                            <clipPath id='clip0_9_2121'>
                                <path d='M0 0h20v20H0z' />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default CartElement;
