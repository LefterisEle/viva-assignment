import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import cartHandler from '../../handlers/cartHandler';

const VoucherForm = () => {
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherError, setVoucherError] = useState(null);

    const { cart, setVoucher, voucher } = useCartContext();

    const { calculateProductSum, validateVoucher, validateAllCaps } =
        cartHandler;

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            validateAllCaps(voucherCode);

            const cartDiscount = validateVoucher(
                calculateProductSum(cart),
                voucherCode,
                cart
            );
            setVoucher({ discount: cartDiscount, code: voucherCode });
        } catch (error) {
            setVoucherError(error.message);
        }
    };

    const handleChange = (e) => {
        setVoucherCode(e.target.value);
    };

    useEffect(() => {
        if (voucherError) {
            setTimeout(() => {
                setVoucherError(null);
                setVoucherCode('');
            }, 3000);
        }
    }, [voucherError]);

    return (
        <>
            <div className='mt-4 p-4'>
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor='voucherCode'
                        className='block text-sm font-semibold text-gray-500'
                    >
                        If you have a discount code, enter it below to redeem
                        it.
                    </label>
                    <div className='my-2 grid grid-cols-3 gap-2'>
                        <input
                            type='text'
                            id='voucherCode'
                            name='voucherCode'
                            value={voucherCode}
                            onChange={handleChange}
                            className='p-2 border rounded col-span-2'
                            placeholder='Type discount code...'
                            required
                            disabled={voucher.code ? true : false}
                        />
                        <button
                            type='submit'
                            className={`border rounded bg-primary text-white 
                            ${
                                voucher.code
                                    ? 'opacity-70 bg-gray-600'
                                    : 'hover:bg-secondary  font-bold active:scale-95 transition-transform'
                            }`}
                            disabled={voucher.code ? true : false}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {voucher.code && (
                <div className='pl-8 flex gap-2 text-center'>
                    <h2>
                        Your{' '}
                        <span className='text-green-700 font-bold'>active</span>{' '}
                        discount code: {voucher.code}
                    </h2>
                    <button
                        onClick={() => {
                            setVoucher({ discount: 0, code: '' });
                            setVoucherCode('');
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5 hover:scale-105 transitin ease-in-out duration-200'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                        </svg>
                    </button>
                </div>
            )}
            {voucherError && (
                <p className='text-red-500 text-sm mb-4 pl-4'>{voucherError}</p>
            )}
        </>
    );
};

export default VoucherForm;
