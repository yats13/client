import { Color } from '../types/enums/Color';

type PageTitleProps = {
    text: string;
};

export default function PageTitle({ text }: PageTitleProps) {
    return (
        <div className={`bg-mint/80 max-w-[40%] -mt-8`}>
            <h2 className={`text-5xl font-serif font-bold text-purple p-20 pt-40`}>{text}</h2>
        </div>
    );
}