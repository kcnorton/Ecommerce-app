import React, { useState } from 'react';
import { getProducts } from '../api/products';
import { Products } from '../types/Products';

const ProductsView = () => {
    // the product data is returned in asc order by id
    const [asc, setAsc] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('id');
    const products = getProducts();

    const sortColumn = (prop: keyof Products) => {
        if (asc || sortBy !== prop) {
            products.sort((a, b) => {
                if (prop === 'rating') {
                    return +a.rating.rate - +b.rating.rate;
                } else if (typeof a[prop] === 'number') {
                    return +a[prop] - +b[prop];
                } else {
                    const aUpper = a[prop].toString().toUpperCase();
                    const bUpper = b[prop].toString().toUpperCase();
                    if (aUpper > bUpper) {
                        return 1;
                    } else if (aUpper < bUpper) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
        } else {
            products.sort((a, b) => {
                if (prop === 'rating') {
                    return +b.rating.rate - +a.rating.rate;
                } else if (typeof a[prop] === 'number') {
                    return +b[prop] - +a[prop];
                } else {
                    const aUpper = a[prop].toString().toUpperCase();
                    const bUpper = b[prop].toString().toUpperCase();
                    if (aUpper > bUpper) {
                        return -1;
                    } else if (aUpper < bUpper) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }
        setSortBy(prop);
        (sortBy === prop || asc) && setAsc(!asc);
    };
    return (
        <>
            <div>Products</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {products?.length > 0 &&
                                Object.keys(products[0]).map((prop) => (
                                    <th
                                        key={prop}
                                        onClick={(e) =>
                                            sortColumn(prop as keyof Products)
                                        }
                                    >
                                        {prop}
                                    </th>
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
                                    <td>
                                        <img src={product.image} />
                                    </td>
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
