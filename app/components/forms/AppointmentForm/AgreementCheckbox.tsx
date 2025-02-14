type AgreementCheckboxProps = {
  disabled: boolean;
  label: string;
};

export function AgreementCheckbox({ disabled, label }: AgreementCheckboxProps) {
  return (
    <div className="flex items-center justify-center my-5">
      <input
        id="agree"
        name="agree"
        type="checkbox"
        required
        className="w-4 h-4 text-mint rounded-sm accent-mint"
        disabled={disabled}
      />
      <label htmlFor="agree" className="ms-2 text-sm font-medium text-primary">
        {label}
      </label>
    </div>
  );
} 