import { useQuery } from '@tanstack/react-query';
import { Products } from '../types/Products';

const fetchProducts = (): Promise<Products[]> =>
    fetch('https://fakestoreapi.com/products?limit=5')
        .then((res) => res.json())
        .then((json) => json);

export const getProducts = () => {
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    return data || [];
};
