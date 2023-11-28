const calculateProductSum = (products) => {
    const productSum = products.reduce((totalSum, product) => {
        const { cartPrice } = product;
        return totalSum + cartPrice;
    }, 0);

    const truncatedProductSum = Math.floor(productSum * 100) / 100;

    return truncatedProductSum;
};

const cartHandler = {
    calculateProductSum: calculateProductSum,

    validateAllCaps: (action) => {
        const allCapsPattern = /^[A-Z]+$/;
        if (allCapsPattern.test(action)) {
            return true;
        } else {
            throw new Error('Only capital letters allowed');
        }
    },

    validateVoucher: (state, action, cartList) => {
        switch (action) {
            case 'HAPPYBIRTHDAY':
                let discount = state * 0.2;
                return parseFloat(discount.toFixed(2));

            case 'SUMMER':
                return 2;

            case 'ILIKEAPPLES':
                const appleProducts = cartList.filter(
                    (product) =>
                        product.productID ===
                        'd65d349b-2a77-4fdb-9d7a-0ab85eb84fd1'
                );

                return parseFloat(
                    (calculateProductSum(appleProducts) * 0.6).toFixed(2)
                );

            case 'ILIKEPEARS':
                const pearProducts = cartList.filter(
                    (product) =>
                        product.productID ===
                        '34d69140-d883-48d5-9af6-cecae5e653e2'
                );

                return parseFloat(
                    (calculateProductSum(pearProducts) * 0.4).toFixed(2)
                );

            case 'GREEN':
                const greenProducts = cartList.filter(
                    (product) =>
                        product.productID ===
                            '34d69140-d883-48d5-9af6-cecae5e653e2' ||
                        product.productID ===
                            '51405659-f333-4f68-871d-fe0fc4706678'
                );

                return parseFloat(
                    (calculateProductSum(greenProducts) * 0.3).toFixed(2)
                );

            default:
                throw new Error('Provide valid discount code');
        }
    },
};

export default cartHandler;
