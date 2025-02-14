export type FormAction<TState> = (prevState: TState, formData: FormData) => Promise<TState>;

export type FormSubmitHandler = (formData: FormData) => void;

export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  className: string;
}; 