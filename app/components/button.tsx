'use client';

import React from 'react';
import {ButtonProps} from '../types/props/ButtonProps';
import {ButtonVariant} from '../types/enums/ButtonVariant';
import {Color} from '../types/enums/Color';
import Status from './status';

const Button: React.FC<ButtonProps> = ({ label, variant }) => {
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
            className="rounded-full pl-6 pr-8 py-2 pointer flex justify-stretch items-center"
            style={getButtonStyle()}
        >
            {/* Status Component with Glow on Button Hover */}
            <Status color={Color.Mint} />
            <span className="block">{label}</span>
        </button>
    );
};

export default Button;
