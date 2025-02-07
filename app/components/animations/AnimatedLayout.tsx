'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
            
                {children}
            </motion.main>
        </AnimatePresence>
    );
} 