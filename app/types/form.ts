export type FormAction = (prevState: FormState, formData: FormData) => Promise<FormState>;

export type FormSubmitHandler = (formData: FormData) => void;

export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  className: string;
}; 