import { useState } from 'react';
import SelectedProducts from '../components/checkout/SelectedProducts';
import { useCartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import VoucherForm from '../components/checkout/VoucherForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import Receipt from '../components/checkout/Receipt';

const CheckoutPage = () => {
    const [clickedProduct, setClickedProduct] = useState('');
    const { cart } = useCartContext();

    const selectedProducts = cart.map((product) => (
        <div key={product.cartID}>
            <SelectedProducts
                product={product}
                clickedProduct={clickedProduct}
                setClickedProduct={setClickedProduct}
            />
        </div>
    ));

    return (
        <div
            id='checkoutPage'
            className='flex flex-col md:grid md:grid-cols-3 relative'
        >
            <div className='md:border-2 md:col-span-2 md:mx-8 xl:mx-16 md:mb-6'>
                <section id='selectedProducts'>
                    <h2 className='inline m-8 text-xl py-2 px-4 text-primary bg-[#f5f5f5]'>
                        Selected Products
                    </h2>
                    {selectedProducts}
                    <div className='mt-4'>
                        <Link
                            to='..'
                            className='inline-flex flex-row gap-2 items-center ml-4 hover:bg-[#f5f5f5] hover:text-primary py-2 px-4 transition-colors'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z'
                                    clipRule='evenodd'
                                />
                            </svg>

                            <p>Add more fruits</p>
                        </Link>
                    </div>
                </section>

                <section className='mt-12' id='paymentInfo'>
                    <h2 className='inline m-8 text-xl py-2 px-4 text-white bg-primary'>
                        Payment Information
                    </h2>
                    {<PaymentMethod />}
                </section>

                <section id='voucher' className='mt-16'>
                    {' '}
                    <h2 className='inline m-8 text-xl py-2 px-4 text-primary bg-[#f5f5f5]'>
                        Discount Code
                    </h2>
                    {<VoucherForm />}
                </section>
            </div>

            <section
                id='receipt'
                className='mt-16 md:mt-0 md:max-w-2xl md:h-full'
            >
                {<Receipt />}
            </section>
        </div>
    );
};

export default CheckoutPage;
