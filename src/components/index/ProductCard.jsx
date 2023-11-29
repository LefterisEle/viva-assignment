import { useEffect, useState } from 'react';
import CartElement from './CartElement';
import { useCartContext } from '../../context/CartContext';

const ProductCard = ({ el }) => {
    const [cartError, setCartError] = useState(false);

    const { cart, addToCart, subtractQuantity, mapCartPrice, updateQuantity } =
        useCartContext();

    //we need to have unique id per cart
    // we cant use cart.length + product id for that
    // there could be substractions etc.
    const generateRandomId = () => {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // iterate through characters and with math.random generate a random string for id
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    };

    const handleAddButton = () => {
        try {
            addToCart({
                name: el.name,
                productID: el.id,
                basePrice: el.price,
                cartID: generateRandomId(),
                quantity: 500,
                cartPrice: mapCartPrice(el.price, 500),
            });
        } catch (error) {
            setCartError(true);
        }
    };

    // 1st filter our cart to check if this product is added there
    // then map over - we want more than 1 rows per product -
    const cartElements = cart
        .filter((product) => product.productID === el.id)
        .map((cartProduct) => {
            return (
                <CartElement
                    key={cartProduct.cartID}
                    subtractQuantity={subtractQuantity}
                    cartProduct={cartProduct}
                    updateQuantity={updateQuantity}
                />
            );
        });

    useEffect(() => {
        setTimeout(() => {
            setCartError(false);
        }, 6000);
    }, [cartError]);

    return (
        <div
            key={el.id}
            className='rounded bg-white flex flex-col items-center
                mx-6 my-2 drop-shadow-md pb-4 relative hover:scale-105 ease-in-out duration-300'
        >
            <img
                src='/src/assets/fruits.png'
                alt='placeholder image for fruits'
            />
            <div className='order-1 h-full flex flex-col justify-evenly mt-4 mr-8 '>
                <p className='text-primary'>
                    {el.price / 100}
                    <span className='text-sm text-gray-500'>/kg</span>
                </p>
                <h1 className='font-bold'>{el.name}</h1>

                <div
                    className={`text-red-500 text-sm ${
                        cartError
                            ? 'opacity-100 transition-opacity ease-in duration-500'
                            : 'opacity-0'
                    }`}
                    style={{ display: cartError ? 'block' : 'none' }}
                >
                    Reached the limit
                </div>
            </div>
            <div className='absolute top-0 right-0 flex flex-col items-end gap-1 text-primary'>
                <button
                    onClick={() => {
                        handleAddButton();
                    }}
                    className='rounded-bl-lg bg-gray-100 px-2 py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 4.5v15m7.5-7.5h-15'
                        />
                    </svg>
                </button>

                {cartElements}
            </div>
        </div>
    );
};

export default ProductCard;
