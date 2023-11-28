import React, { useEffect, useState } from 'react';
import validationHandler from '../../handlers/validationHandler';
import { useCartContext } from '../../context/CartContext';

const PaymentMethod = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardName: '',
    });

    const [errors, setErrors] = useState({
        cardNumber: false,
        expirationDate: false,
        cvv: false,
        cardName: false,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { cardList, setCardList } = useCartContext();

    const { validateCardInfo } = validationHandler;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (validateCardInfo(value, name)) {
            setErrors({
                ...errors,
                [name]: false,
            });
        } else {
            setErrors({
                ...errors,
                [name]: true,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedCardList = [...cardList, { ...formData }];
        setCardList(updatedCardList);
        console.log(updatedCardList);

        setFormData({
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            cardName: '',
        });

        setErrors({
            cardNumber: false,
            expirationDate: false,
            cvv: false,
            cardName: false,
        });
    };

    useEffect(() => {
        const isAnyErrorTrue = Object.values(errors).some(
            (value) => value === true
        );

        isAnyErrorTrue ? setIsButtonDisabled(true) : setIsButtonDisabled(false);
    }, [errors]);

    if (cardList.length === 0) {
        return (
            <div className='p-6 bg-white mb-4'>
                <h2 className='text-xl font-semibold mb-2'>
                    Add your card information below
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Card Name */}
                    <div className='mb-6'>
                        <label
                            htmlFor='cardName'
                            className='block text-sm font-medium text-gray-600'
                        >
                            Card Name
                        </label>
                        <input
                            type='text'
                            id='cardName'
                            name='cardName'
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            className='mt-1 p-2 w-full border rounded-md'
                        />
                    </div>

                    {errors.cardName && (
                        <p className='text-red-500 text-sm mb-4'>
                            Only letters and spaces are allowed
                        </p>
                    )}

                    {/* Card Number */}
                    <div className='mb-4'>
                        <label
                            htmlFor='cardNumber'
                            className='block text-sm font-medium text-gray-600'
                        >
                            Card Number
                        </label>
                        <input
                            type='text'
                            id='cardNumber'
                            name='cardNumber'
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            className='mt-1 p-2 w-full border rounded-md'
                        />
                    </div>
                    {errors.cardNumber && (
                        <p className='text-red-500 text-sm mb-4'>
                            Please add only numbers or spaces
                        </p>
                    )}

                    {/* Expiration Date */}
                    <div className='mb-4'>
                        <label
                            htmlFor='expirationDate'
                            className='block text-sm font-medium text-gray-600'
                        >
                            Expiration Date
                        </label>
                        <input
                            type='text'
                            id='expirationDate'
                            name='expirationDate'
                            value={formData.expirationDate}
                            onChange={handleChange}
                            required
                            placeholder='MM/YY'
                            className='mt-1 p-2 w-full border rounded-md'
                        />
                    </div>
                    {errors.expirationDate && (
                        <p className='text-red-500 text-sm mb-4'>
                            Only future dates are allowed or invalid format
                            (MM/YY)
                        </p>
                    )}

                    {/* CVV */}
                    <div className='mb-4'>
                        <label
                            htmlFor='cvv'
                            className='block text-sm font-medium text-gray-600'
                        >
                            CVV
                        </label>
                        <input
                            type='text'
                            id='cvv'
                            name='cvv'
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            className='mt-1 p-2 w-full border rounded-md'
                        />
                    </div>
                    {errors.cvv && (
                        <p className='text-red-500 text-sm mb-4'>
                            CVV must be 3 or 4 digits
                        </p>
                    )}

                    <button
                        type='submit'
                        className={`bg-primary text-white p-2 rounded-md hover:bg-secondary focus:outline-none 
                        focus:ring focus:border-primary active:scale-95 transition-transform ${
                            isButtonDisabled && 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={isButtonDisabled}
                    >
                        Add card
                    </button>
                </form>
            </div>
        );
    } else
        return (
            <div className='border border-gray-200 rounded-md flex gap-4  items-center my-8 mx-4 px-4 py-4'>
                <div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        class='w-6 h-6'
                    >
                        <path
                            fillRule='evenodd'
                            d='M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
                <div className='grow'>
                    <p className='text-primary'>{cardList[0].cardName}</p>
                    <p className='text-sm text-gray-500'>
                        This card will be charged
                    </p>
                </div>
                <button
                    onClick={() => {
                        setCardList([]);
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        class='w-6 h-6 hover:scale-105 transition ease-in-out duration-200'
                    >
                        <path
                            fillRule='evenodd'
                            d='M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 4.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM10 9a.75.75 0 01.75.75v2.546l.943-1.048a.75.75 0 111.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V9.75A.75.75 0 0110 9z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
        );
};

export default PaymentMethod;
