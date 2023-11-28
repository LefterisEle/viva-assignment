import { useLoaderData } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import VivaStorage from '../handlers/vivaStorage';

const { getData } = VivaStorage;

//lets load the products before components render
export function loader() {
    return getData();
}

const IndexPage = () => {
    const data = useLoaderData();

    //create product cards using card component
    const productElements = data.map((el) => (
        <ProductCard key={el.id} el={el} />
    ));

    return (
        <div className='w-full flex flex-col'>
            <h2 className='px-4 mb-8 font-bold text-xl mx-auto md:tracking-wide xl:text-3xl xl:tracking-wide'>
                Choose between <span className='text-primary'>Viva Market</span>{' '}
                Products
            </h2>
            <section className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-1 xl:gap-2 2xl:gap-3'>
                {productElements}
            </section>
        </div>
    );
};

export default IndexPage;
