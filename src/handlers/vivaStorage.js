const VivaStorage = {
    getData: async () => {
        const url = 'https://demo0336234.mockable.io/products';
        const res = await fetch(url);
        if (!res.ok) {
            throw {
                message: 'Failed to fetch viva products',
                statusText: res.statusText,
                status: res.status,
            };
        }
        const data = await res.json();
        return data.products;
    },
};

export default VivaStorage;
