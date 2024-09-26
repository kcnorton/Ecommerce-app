import React from 'react';
import { getProducts } from '../api/products';

const ProductsView = () => {
    const products = getProducts();

    return (
        <>
            <div>Products</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {products?.length > 0 &&
                                Object.keys(products[0]).map((prop) => (
                                    <th key={prop}>{prop}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category}</td>
                                    <td>{product.image}</td>
                                    <td>{product.rating.rate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductsView;
