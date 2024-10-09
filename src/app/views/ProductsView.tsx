import React, { useState } from 'react';
import { useGetProducts } from '../api/products';
import { Products } from '../types/products';
import { useRouter } from 'next/navigation';

const ProductsView = () => {
    const router = useRouter();

    // the product data is returned in asc order by id
    const [asc, setAsc] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('id');
    const [search, setSearch] = useState<string>('');
    const { data: productData, isLoading } = useGetProducts();
    const [products, setProducts] = useState<Products[]>([]);

    React.useEffect(() => {
        !isLoading && setProducts(productData);
    }, [isLoading]);

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

    const performSearch = (value: string) => {
        setSearch(value);
        const searchResult = productData.filter(
            (product) =>
                product.description.includes(value) ||
                product.category.includes(value) ||
                product.title.includes(value)
        );
        setProducts(searchResult);
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 min-w-fit text-sm">
            <div className="flex gap-3">
                <input
                    placeholder="Search"
                    value={search}
                    onChange={(event) => performSearch(event.target.value)}
                />
                {/* <button
                    className="rounded p-3 bg-cyan-200"
                    onClick={() => performSearch(search)}
                >
                    Search
                </button> */}
                {search && (
                    <button
                        className="rounded p-3 bg-red-100"
                        onClick={() => {
                            setSearch('');
                            setProducts(productData);
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
            <div className="py-4">Products</div>
            <div className="py-4 flex">
                <table className="table-fixed mx-4 max-w-screen-md xs:max-w-fit">
                    <thead>
                        <tr className="border">
                            {products?.length > 0 &&
                                Object.keys(products[0]).map((prop) => (
                                    <th
                                        key={prop}
                                        onClick={(e) =>
                                            sortColumn(prop as keyof Products)
                                        }
                                        className="hover:cursor-pointer"
                                    >
                                        {prop}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody className="border">
                        {products.map((product) => {
                            return (
                                <tr
                                    key={product.id}
                                    className="hover:bg-slate-100 hover:cursor-pointer"
                                    onClick={(e) =>
                                        router.push(`/product/${product.id}`)
                                    }
                                >
                                    <td className="td-class">{product.id}</td>
                                    <td className="td-class">
                                        {product.title}
                                    </td>
                                    <td className="td-class">
                                        {product.price}
                                    </td>
                                    <td className="td-class">
                                        {product.description}
                                    </td>
                                    <td className="td-class">
                                        {product.category}
                                    </td>
                                    <td className="td-class">
                                        <img
                                            alt="Product image"
                                            src={product.image}
                                            width="80px"
                                            height="80px"
                                        />
                                    </td>
                                    <td className="td-class">
                                        {product.rating.rate}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsView;
