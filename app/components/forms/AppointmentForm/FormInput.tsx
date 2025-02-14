type FormInputProps = {
  type: 'text' | 'email' | 'tel';
  name: string;
  placeholder: string;
  disabled: boolean;
  className: string;
};

export function FormInput({ type, name, placeholder, disabled, className }: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className={className}
      disabled={disabled}
    />
  );
} 