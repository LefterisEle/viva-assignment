import { createContext, useContext, useEffect, useState } from 'react';
import cartHandler from '../handlers/cartHandler';

export const Context = createContext();

const Provider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [voucher, setVoucher] = useState({ discount: 0, code: '' });
    const [totalPrice, setTotalPrice] = useState(0);
    const [cardList, setCardList] = useState([]);

    const { calculateProductSum, validateVoucher } = cartHandler;

    const addToCart = (newItem) => {
        const filteredCart = cart.filter(
            (product) => product.productID === newItem.productID
        );
        if (filteredCart.length > 7) {
            throw new Error('The limit is 8 products');
        }
        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
    };

    const updateQuantity = (id, amount) => {
        const updatedCart = cart.map((product) => {
            if (product.cartID === id) {
                return {
                    ...product,
                    quantity: product.quantity + amount,
                    cartPrice: mapCartPrice(
                        product.basePrice,
                        product.quantity + amount
                    ),
                };
            } else {
                return { ...product };
            }
        });
        setCart(updatedCart);
    };

    const subtractQuantity = (id) => {
        const el = cart.find((product) => product.cartID === id);

        if (el.quantity !== 500) {
            updateQuantity(id, -500);
        } else {
            removeProduct(id);
        }
    };

    const mapCartPrice = (basePrice, quantity) =>
        ((basePrice / 1000) * quantity) / 100;

    const removeProduct = (id) => {
        const updatedCart = cart.filter((product) => product.cartID !== id);
        setCart(updatedCart);
    };

    //use this use effect to check when voucher changes
    useEffect(() => {
        const cartPrice = calculateProductSum(cart) - voucher.discount;
        if (Math.sign(cartPrice) === -1) {
            setTotalPrice(0);
        } else setTotalPrice(cartPrice.toFixed(2));
    }, [voucher]);

    //use this use effect if a voucher is active and they add products
    useEffect(() => {
        if (voucher.code) {
            const cartDiscount = validateVoucher(
                calculateProductSum(cart),
                voucher.code,
                cart
            );
            setVoucher({ ...voucher, discount: cartDiscount });
        }
        const cartPrice = calculateProductSum(cart) - voucher.discount;
        if (Math.sign(cartPrice) === -1) {
            setTotalPrice(0);
        } else setTotalPrice(cartPrice.toFixed(2));
    }, [cart]);

    return (
        <Context.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeProduct,
                mapCartPrice,
                updateQuantity,
                subtractQuantity,
                voucher,
                setVoucher,
                totalPrice,
                setTotalPrice,
                cardList,
                setCardList,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useCartContext = () => {
    return useContext(Context);
};

export default Provider;
