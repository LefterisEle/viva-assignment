import { useCartContext } from '../../context/CartContext';

const SelectedProducts = ({ product, setClickedProduct, clickedProduct }) => {
    const { removeProduct, subtractQuantity, updateQuantity } =
        useCartContext();

    const handleProductClick = (id) => {
        setClickedProduct(id);
    };

    return (
        <div className='flex justify-between items-center my-8 mx-4 p-2'>
            <div className='flex flex-row'>
                <img
                    src='src\assets\fruits.png'
                    alt='placeholder image for fruits'
                    className='w-[100px] h-[75px]'
                />
                <div>
                    <p className='font-bold'>{product.name}</p>
                    <p className='text-sm text-gray-500'>
                        {`${product.basePrice / 100}€/kg`}
                    </p>
                    <p className='mt-2 text-primary'>
                        {`${product.cartPrice.toFixed(2)}€`}
                    </p>
                </div>
            </div>

            {clickedProduct === product.cartID ? (
                <div
                    onMouseLeave={() => setClickedProduct('')}
                    className='grid grid-cols-4 border-2 gap-2
                     text-primary py-2 hover:border-primary'
                >
                    <div className='flex justify-between col-span-3 gap-2'>
                        <button
                            onClick={() => {
                                subtractQuantity(product.cartID);
                            }}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5 rounded-full hover:bg-gray-200 ml-2'
                            >
                                <path d='M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z' />
                            </svg>
                        </button>
                        <p>
                            {product.quantity === 500
                                ? `${product.quantity}gr`
                                : `${product.quantity / 1000}kg`}
                        </p>
                        <button
                            onClick={() => {
                                updateQuantity(product.cartID, 500);
                            }}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5 rounded-full hover:bg-gray-200'
                            >
                                <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            removeProduct(product.cartID);
                        }}
                        className='rounded-full hover:bg-gray-200 '
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5 mx-auto rounded-full'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleProductClick(product.cartID)}
                    className='border-2 text-primary px-4 py-2 hover:border-primary w-[100px]'
                >
                    {product.quantity === 500
                        ? `${product.quantity}gr`
                        : `${product.quantity / 1000}kg`}
                </button>
            )}
        </div>
    );
};

export default SelectedProducts;
