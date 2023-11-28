import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();

    return (
        <div
            className='flex flex-col items-center justify-center h-screen'
            style={{ backgroundColor: '#f7fafc' }}
        >
            <h1 className='text-3xl font-bold mb-4 text-red-600'>
                Error: {error.message}
            </h1>
            <p className='text-lg text-gray-700'>
                <strong>Status:</strong> {error.status} - {error.statusText}
            </p>
            {error.response && (
                <pre className='text-sm text-gray-600'>
                    <strong>Response:</strong>{' '}
                    {JSON.stringify(error.response, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Error;
