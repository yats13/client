'use client';

import React from 'react';
import { Color } from '../types/enums/Color';

interface StatusProps {
    color: Color;
}

const Status: React.FC<StatusProps> = ({ color }) => {
    return (
        <div 
            className="rounded-full w-1 h-1 p-2 mr-2"
            style={{ backgroundColor: color }}
        />
    );
};

export default Status;
