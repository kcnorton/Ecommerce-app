'use client';
import ProductsView from './views/ProductsView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <ProductsView />
            </div>
        </QueryClientProvider>
    );
}
