'use client';
import ProductsView from './views/ProductsView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
                <ProductsView />
            </div>
        </QueryClientProvider>
    );
}
