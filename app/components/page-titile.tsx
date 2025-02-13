import { Color } from '../types/enums/Color';
import AnimatedText from '@/app/components/animations/AnimatedText';

type PageTitleProps = {
    text: string;
};

export default function PageTitle({ text }: PageTitleProps) {
    return (
        <div className={`bg-mint/80 max-w-[40%] -mt-8 animate-expand`}>
            <AnimatedText 
                text={text}
                block="h2"
                className="text-5xl font-serif font-bold text-purple p-20 pt-40"
                delay={0.06}
            />
        </div>
    );
}