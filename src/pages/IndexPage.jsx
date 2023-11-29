import { useLoaderData, Await, defer } from 'react-router-dom';
import ProductCard from '../components/index/ProductCard';
import VivaStorage from '../handlers/vivaStorage';
import React from 'react';

const { getData } = VivaStorage;

//lets load the products before components render
export async function loader() {
    return defer({ fruitsData: getData() });
}

const IndexPage = () => {
    const data = useLoaderData();

    return (
        <>
            <React.Suspense
                fallback={
                    <div className='flex items-center justify-center h-screen'>
                        <p className='text-4xl font-bold text-gray-800'>
                            Fetching Fruits...
                        </p>
                    </div>
                }
            >
                <Await resolve={data.fruitsData}>
                    {(fruitsData) => (
                        <div className='w-full flex flex-col '>
                            <h2 className='px-4 mb-8 font-bold text-xl mx-auto md:tracking-wide xl:text-3xl xl:tracking-wide'>
                                Choose between{' '}
                                <span className='text-primary'>
                                    Viva Market
                                </span>{' '}
                                Products
                            </h2>
                            <section className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-1 xl:gap-2 2xl:gap-3'>
                                {fruitsData.map((el) => (
                                    <ProductCard key={el.id} el={el} />
                                ))}
                            </section>
                        </div>
                    )}
                </Await>
            </React.Suspense>
        </>
    );
};

export default IndexPage;
