import { useQuery } from '@tanstack/react-query';
import { Products } from '../types/products';

const fetchProducts = (): Promise<Products[]> =>
    fetch('https://fakestoreapi.com/products?limit=5')
        .then((res) => res.json())
        .then((json) => json);

export const useGetProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    return { data: data || [], isLoading: isLoading } || [];
};
