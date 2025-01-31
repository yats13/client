'use client';

import React from 'react';
import { LinkProps } from '../types/props/LinkProps';
import { ButtonVariant } from '../types/enums/ButtonVariant';
import { Color } from '../types/enums/Color';
import Status from './status';
import Link from 'next/link';

const LinkTo: React.FC<LinkProps> = ({ label, href, variant }) => {
    // Define classes for each variant
    const baseClasses = `
        ${variant ===  ButtonVariant.Primary || variant === ButtonVariant.Secondary  ? 'rounded-full' : ''} 
        pl-6 pr-8 py-2 pointer border flex justify-stretch items-center max-w-40 z-20 transition duration-300 ease-in-out'
    `

    const primaryClasses = `
        bg-white text-purple border-purple
        transition
        hover:text-white hover:bg-purple hover:border-purple
    `;

    const secondaryClasses = `
        bg-white text-lightPurple border-lightPurple
        hover:text-white hover:bg-lightPurple hover:border-lightPurple
    `;

    const groupActiveClasses = `
        bg-purple text-white border-purple rounded-full transition-all
        hover:text-white hover:shadow-md
    `;
  
    const groupInactiveClasses = `
        border-lightPurple bg-lightPurple px-10 py-2 rounded-l-full
      hover:text-white shadow-inner
    `;
    

    // Determine which classes to apply based on the variant
    const variantClasses = () => {
        switch (variant) {
            case ButtonVariant.Primary:
                return primaryClasses;
            case ButtonVariant.Secondary:
                return secondaryClasses;
            case ButtonVariant.GroupActive:
                return groupActiveClasses;
            case ButtonVariant.GroupInactive:
                return groupInactiveClasses;                
            default:
                return '';
        }
    };

    return (
        <Link
            href={href}
            className={`${baseClasses} ${variantClasses()}`}
        >
            {/* Status Component with Glow on Button Hover */}
            <Status color={variant ===  ButtonVariant.GroupInactive ? Color.Purple : Color.Mint} />
            <span className="block">{label}</span>
        </Link>
    );
};

export default LinkTo;
