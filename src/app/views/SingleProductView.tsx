import React from 'react';
import { useParams, useRouter } from 'next/navigation';

const SingleProductView = () => {
    const router = useRouter();
    const { id } = useParams();

    return <div>product id: {id}</div>;
};

export default SingleProductView;
