'use client';

import { useState, useEffect } from 'react';
import PageLoader from '@/app/components/page-loader';

const ClientLayout = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return <PageLoader />;
};

export default ClientLayout;
