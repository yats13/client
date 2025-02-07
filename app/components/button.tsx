'use client';

import React from 'react';
import {ButtonVariant} from '../types/enums/ButtonVariant';
import {Color} from '../types/enums/Color';
import Status from './status';

interface ButtonProps {
    label: string;
    variant: ButtonVariant;
    className?: string;  // Make className optional
    type?: 'button' | 'submit' | 'reset';  // Add this line
}

const Button: React.FC<ButtonProps> = ({ label, variant, className, type, ...props }) => {
    // Apply styles based on the variant
    const getButtonStyle = () => {
        switch (variant) {
            case ButtonVariant.Primary:
                return {
                    backgroundColor: Color.White,
                    color: Color.Purple,
                };
            case ButtonVariant.Secondary:
                return {
                    backgroundColor: Color.White,
                    color: Color.LightPurple,
                };
            case ButtonVariant.Outline:
                return {
                    backgroundColor: 'transparent',
                    border: '1px solid ' + Color.Grey,
                    color: Color.Grey,
                };
            default:
                return {};
        }
    };

    return (
        <button
            className={`rounded-full px-6 py-2 pointer flex items-center gap-2 ${className || ''}`}
            style={getButtonStyle()}
            type={type}
            {...props}
        >
            <Status color={Color.Mint} />
            <span>{label}</span>
        </button>
    );
};

export default Button;
