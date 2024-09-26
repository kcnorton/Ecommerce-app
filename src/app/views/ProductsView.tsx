import React, { useState, useEffect } from 'react';

const ProductsView = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    return (
        <>
            <div>Products</div>
            <div>
                <table>
                    <thead>
                        <td key={2} id={'2'}>
                            table header
                        </td>
                    </thead>
                    <tbody>
                        <tr>
                            <td key={1} id={'1'}>
                                table data
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductsView;
