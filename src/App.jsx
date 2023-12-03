import React, { Suspense } from 'react';
import IndexPage, { loader as indexPageLoader } from './pages/IndexPage';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import Layout from './components/Layout';

const LazyCheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const LazyNotFound = React.lazy(() => import('./components/NotFound'));
const LazyError = React.lazy(() => import('./components/Error'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            errorElement={
                <Suspense fallback='Loading...'>
                    <LazyError />
                </Suspense>
            }
        >
            <Route index element={<IndexPage />} loader={indexPageLoader} />
            <Route
                path='checkout'
                element={
                    <Suspense fallback='Loading...'>
                        <LazyCheckoutPage />
                    </Suspense>
                }
            />
            <Route
                path='*'
                element={
                    <Suspense fallback='Loading...'>
                        <LazyNotFound />
                    </Suspense>
                }
            />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
