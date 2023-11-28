const validationHandler = {
    validateCardInfo: (state, action) => {
        switch (action) {
            case 'cardNumber':
                const cardNumberPattern = /^[0-9\s]+$/;
                return cardNumberPattern.test(state);

            case 'expirationDate':
                //first check the date
                const currentDate = new Date();
                const [inputMonth, inputYear] = state.split('/');
                const inputDateObject = new Date(
                    `20${inputYear}`,
                    inputMonth - 1
                );
                //then check the pattern
                const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
                //need both date and pattern to be truth
                if (
                    inputDateObject > currentDate &&
                    expirationDatePattern.test(state)
                ) {
                    return true;
                } else {
                    return false;
                }

            case 'cvv':
                const cvvPattern = /^[0-9]{3,4}$/;
                return cvvPattern.test(state);

            case 'cardName':
                const cardNamePattern = /^[A-Za-z ]+$/;
                return cardNamePattern.test(state);

            default:
                return 0;
        }
    },
};

export default validationHandler;
