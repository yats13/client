'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
} 