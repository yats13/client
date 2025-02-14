type FormSuccessMessageProps = {
  label: string;
  value?: string;
};

export function FormSuccessMessage({ label, value }: FormSuccessMessageProps) {
  return (
    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
      {label}: {value}
    </p>
  );
} 