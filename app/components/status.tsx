'use client';

import React from 'react';
import { Color } from '../types/enums/Color';

interface StatusProps {
    color: Color;
}

const Status: React.FC<StatusProps> = ({ color }) => {
    return (
        <div
            className="w-4 h-4 rounded-full mr-2"
            style={{
                backgroundColor: color,
            }}
        ></div>
    );
};

export default Status;
