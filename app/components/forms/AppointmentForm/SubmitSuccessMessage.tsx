type SubmitSuccessMessageProps = {
  message: string;
};

export function SubmitSuccessMessage({ message }: SubmitSuccessMessageProps) {
  return (
    <p className="bg-mint py-2 px-6 rounded-full font-bold text-lg text-center">
      {message}
    </p>
  );
} 