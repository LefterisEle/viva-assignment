import { Link, useLocation } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

const Navbar = () => {
    const { cart, totalPrice } = useCartContext();
    const location = useLocation();

    return (
        <header className='w-full sticky top-0 z-50 bg-white min-h-[50px] drop-shadow-md'>
            <nav className='flex justify-between py-2 px-4 md:px-8 xl:px-12 items-center'>
                <Link
                    to='/'
                    className='flex justify-center py-2 gap-2 items-center'
                >
                    <img
                        src='src\assets\logo-clean-44x32.png'
                        style={{
                            width: '20px',
                            height: '20px',
                            color: 'black',
                        }}
                    />
                    <p className='font-bold'>viva.com | market</p>
                </Link>
                {/* shown order count + total sum only when there are products in
                cart and i am in indexpage */}
                {cart.length > 0 && location.pathname === '/' && (
                    <Link
                        to='checkout'
                        className='px-5 py-2 flex justify-between bg-primary
                         hover:bg-secondary rounded-sm active:scale-95 transition-transform'
                    >
                        <div className='flex items-center gap-4 '>
                            <p
                                className={`rounded-full px-2 bg-white text-primary text-center ${
                                    cart.length > 9 ? 'px-1' : null
                                }`}
                            >
                                {cart.length}
                            </p>
                            <p className='text-white'>Check Order</p>

                            <p className='text-white'>{`${totalPrice}€`}</p>
                        </div>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
