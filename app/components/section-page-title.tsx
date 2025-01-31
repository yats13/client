import { Color } from '../types/enums/Color';

type HomePageTitleProps = {
    text: string;
};

export default function SectionPageTitle({ text }: HomePageTitleProps) {
    return (
        <div className={`bg-mint/80 flex-1 w-full md:max-w-[50%]`}>
            <h2 className={`text-6xl font-bold font-serif text-purple px-20 pb-10 pt-20 md:pt-40`}>{text}</h2>
        </div>
    );
}