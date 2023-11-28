import IndexPage, { loader as indexPageLoader } from './pages/IndexPage';
import CheckoutPage from './pages/CheckoutPage';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Error from './components/Error';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} errorElement={<Error />}>
            <Route index element={<IndexPage />} loader={indexPageLoader} />
            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='*' element={<NotFound />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
