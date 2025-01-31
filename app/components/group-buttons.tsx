import React from 'react';
import LinkTo from './link-to';
import { ButtonVariant } from '../types/enums/ButtonVariant';

const GroupButtons = () => {
  return (
      <div className='bg-lightPurple text-white mx-auto rounded-full flex w-fit'>
        <LinkTo label='Стоимость' href='/services' variant={ButtonVariant.GroupInactive} />
        <LinkTo label='Записаться' href='/calendar' variant={ButtonVariant.GroupActive} />
      </div>
  );
};

export default GroupButtons;
