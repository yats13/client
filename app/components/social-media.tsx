import Link from 'next/link';
import { Color } from '../types/enums/Color';

export default function SocialMedia({ color = Color.LightPurple, horizontal = false }) {
    const iconSize = {
        xl: 36,
        md: 18,
        sm: 9
    }

    const socialItems = [
        {
            label: "facebook",
            svgPath: (
                <path
                    d="M24.7917 2.91663H20.4167C18.4828 2.91663 16.6281 3.68485 15.2607 5.05231C13.8932 6.41976 13.125 8.27442 13.125 10.2083V14.5833H8.75V20.4166H13.125V32.0833H18.9583V20.4166H23.3333L24.7917 14.5833H18.9583V10.2083C18.9583 9.82152 19.112 9.45059 19.3855 9.1771C19.659 8.90361 20.0299 8.74996 20.4167 8.74996H24.7917V2.91663Z"
                    stroke={color}
                    strokeWidth="2.1875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ),
            link: "#"
        },
        {
            label: "instagram",
            svgPath: (
                <>
                    <path d="M3.64583 17.4999C3.64583 10.9695 3.64583 7.70284 5.67437 5.67429C7.70291 3.64575 10.9681 3.64575 17.5 3.64575C24.0304 3.64575 27.2971 3.64575 29.3256 5.67429C31.3542 7.70284 31.3542 10.968 31.3542 17.4999C31.3542 24.0303 31.3542 27.297 29.3256 29.3255C27.2971 31.3541 24.0319 31.3541 17.5 31.3541C10.9696 31.3541 7.70291 31.3541 5.67437 29.3255C3.64583 27.297 3.64583 24.0318 3.64583 17.4999Z"
                        stroke={color}
                        strokeWidth="1.4375"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M25.5325 9.479H25.5179M24.0625 17.4998C24.0625 19.2403 23.3711 20.9095 22.1404 22.1402C20.9097 23.3709 19.2405 24.0623 17.5 24.0623C15.7595 24.0623 14.0903 23.3709 12.8596 22.1402C11.6289 20.9095 10.9375 19.2403 10.9375 17.4998C10.9375 15.7594 11.6289 14.0902 12.8596 12.8594C14.0903 11.6287 15.7595 10.9373 17.5 10.9373C19.2405 10.9373 20.9097 11.6287 22.1404 12.8594C23.3711 14.0902 24.0625 15.7594 24.0625 17.4998Z"
                        stroke={color}
                        strokeWidth="1.4375"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            ),
            link: "#"
        },
        {
            label: "telegram",
            svgPath: (
                <path d="M17.4781 22.4699L22.206 27.8453C23.956 29.836 24.8325 30.832 25.7498 30.5885C26.6656 30.3464 26.9806 29.0368 27.6092 26.4162L31.0946 11.8795C32.0644 7.84284 32.5485 5.82597 31.4723 4.82992C30.396 3.83388 28.5308 4.57472 24.8004 6.05492L7.49583 12.928C4.51208 14.1137 3.0202 14.7058 2.92541 15.7237C2.91425 15.8274 2.91425 15.932 2.92541 16.0358C3.01729 17.0551 4.50624 17.6516 7.48708 18.846C8.83603 19.387 9.51124 19.6583 9.99541 20.176C10.0499 20.2343 10.1024 20.2946 10.1529 20.3568C10.5992 20.911 10.7887 21.6401 11.1694 23.0926L11.8825 25.8153C12.2515 27.2299 12.4367 27.9387 12.9223 28.0349C13.4079 28.1312 13.8294 27.5449 14.6737 26.371L17.4781 22.4699ZM17.4781 22.4699L17.0158 21.9887C16.4879 21.4374 16.224 21.1633 16.224 20.822C16.224 20.4808 16.4865 20.2051 17.0158 19.6553L22.2265 14.2245"
                    stroke={color}
                    strokeWidth="2.1875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ),
            link: "#"
        },
    ]

    return (
        <div id="social-media" className={`z-20 ${horizontal ? 'flex justify-between' : 'self-end justify-center'}`}>
            {socialItems.map((item, index) => (
                <Link key={index} href={item.link} className='block mb-2'>
                    <svg width={iconSize.md} height={iconSize.md} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {item.svgPath}
                    </svg>
                </Link>
            ))}
        </div>
    );
}