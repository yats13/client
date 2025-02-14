'use client';

import { useActionState, useOptimistic } from 'react';
import { submitAppointment } from '@/app/actions/submitAppointment';
import Button from '@/app/components/button';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import type { FormState } from '@/app/types/appointment';
import type { FormAction } from '@/app/types/form';
import { ERRORS } from '@/app/constants/errors';
import { MESSAGES } from '@/app/constants/messages';
import { FormInput } from './FormInput';
import { FormSuccessMessage } from './FormSuccessMessage';
import { AgreementCheckbox } from './AgreementCheckbox';
import { SubmitSuccessMessage } from './SubmitSuccessMessage';
import { ErrorMessage } from './ErrorMessage';

type AppointmentFormProps = {
  selectedDate: Date;
  selectedTime: string;
  psychologistSlug: string;
};

const initialState: FormState = {
  success: false,
};

const inputClassName = 'w-full border border-gray-500 bg-transparent rounded-full px-4 py-2 placeholder-gray-500';

export default function AppointmentForm({ selectedDate, selectedTime, psychologistSlug }: AppointmentFormProps) {
  const boundSubmitAppointment: FormAction<FormState> = async (prevState, formData) => {
    const agree = formData.get('agree');
    if (!agree) {
      return {
        success: false,
        error: ERRORS.GENERIC.VALIDATION,
      };
    }

    formData.append('selectedDate', selectedDate.toLocaleString());
    formData.append('selectedTime', selectedTime);
    formData.append('psychologistSlug', psychologistSlug);

    return submitAppointment(formData);
  };

  const [state, formAction] = useActionState(boundSubmitAppointment, initialState);
  const [optimistic, addOptimistic] = useOptimistic(false);

  const handleSubmit = (formData: FormData) => {
    addOptimistic(true);
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-around gap-4 my-5">
        {state.success ? (
          <FormSuccessMessage 
            label={MESSAGES.LABELS.NAME}
            value={state.appointment?.name}
          />
        ) : (
          <FormInput
            type="text"
            name="name"
            placeholder={MESSAGES.LABELS.NAME}
            disabled={state.success}
            className={inputClassName}
          />
        )}

        {state.success ? (
          <FormSuccessMessage 
            label={MESSAGES.LABELS.EMAIL}
            value={state.appointment?.email}
          />
        ) : (
          <FormInput
            type="email"
            name="email"
            placeholder={MESSAGES.LABELS.EMAIL}
            disabled={state.success}
            className={inputClassName}
          />
        )}

        {state.success ? (
          <FormSuccessMessage 
            label={MESSAGES.LABELS.PHONE}
            value={state.appointment?.phone}
          />
        ) : (
          <FormInput
            type="tel"
            name="phone"
            placeholder={MESSAGES.LABELS.PHONE}
            disabled={state.success}
            className={inputClassName}
          />
        )}
      </div>

      {!state.success && (
        <AgreementCheckbox 
          disabled={state.success}
          label={MESSAGES.FORM.AGREE}
        />
      )}

      <div className="flex justify-center my-5">
        {state.success ? (
          <SubmitSuccessMessage message={MESSAGES.FORM.SUCCESS} />
        ) : (
          <Button
            label={optimistic ? MESSAGES.FORM.SUBMITTING : MESSAGES.FORM.SUBMIT}
            variant={ButtonVariant.Outline}
            className="w-full md:w-auto"
            type="submit"
          />
        )}
      </div>

      {state.error && !state.success && (
        <ErrorMessage message={state.error} />
      )}
    </form>
  );
} 