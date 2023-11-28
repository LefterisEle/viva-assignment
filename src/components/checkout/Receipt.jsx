import { useState, useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import cartHandler from '../../handlers/cartHandler';

const Receipt = () => {
    const [submitError, setSubmitError] = useState('');

    const { cart, totalPrice, voucher, cardList } = useCartContext();

    const { calculateProductSum } = cartHandler;

    const isValidOrder = () => {
        if (!(cart.length > 0) && !(cardList.length > 0)) {
            throw new Error('Please add products and payment information');
        }

        if (!(cart.length > 0)) {
            throw new Error('Please add products');
        }

        if (!(cardList.length > 0)) {
            throw new Error('Please add payment information');
        }

        return true;
    };

    const handleSubmitOrder = () => {
        try {
            isValidOrder();
            alert('Success, thanks for reading my code 🤞');
        } catch (error) {
            setSubmitError(error.message);
        }
    };

    useEffect(() => {
        if (submitError) {
            setTimeout(() => {
                setSubmitError(null);
            }, 3000);
        }
    }, [submitError]);

    return (
        <div
            className='border border-gray-200 rounded-md p-4 m-8 text-gray-800
             flex flex-col gap-2 md:border-0 md:shadow-lg md:max-w-[400px] md:sticky md:top-[200px] md:ring-1 md:ring-opacity-10 md:ring-gray-500'
        >
            <h1 className='text-xl font-bold'>Prices in Euros</h1>
            <p className='text-sm text-gray-500'>incl. taxes</p>
            <div className='mt-2 flex justify-between'>
                <h2>{`Subset of products (${cart.length} product${
                    cart.length > 1 ? 's' : ''
                })`}</h2>
                <span>{`${calculateProductSum(cart).toFixed(2)}€`}</span>
            </div>

            {voucher.code && (
                <div className='flex justify-between'>
                    <h2>discount</h2>
                    <span>{`${voucher.discount}€`}</span>
                </div>
            )}

            <hr />

            <div className='flex justify-between'>
                <h2>Total sum</h2>
                <span>{`${totalPrice}€`}</span>
            </div>

            <button
                onClick={handleSubmitOrder}
                className='bg-primary text-white text-lg font-bold my-4 py-4 hover:bg-secondary 
            active:scale-105 focus:outline-none focus:ring-1 ring-primary  transition ease-in-out duration-300'
            >
                Submit Order
            </button>
            {submitError && (
                <p className='text-red-500 text-sm mb-4'>{submitError}</p>
            )}
        </div>
    );
};

export default Receipt;
