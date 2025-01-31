'use client';

import React from 'react';
import {PsychologistProps} from "@/app/types/props/PsychologistProps";
import Image from "next/image";
import AppointmentForm from '@/app/components/forms/AppointmentForm';
import {Color} from "@/app/types/enums/Color";
import Status from "@/app/components/status";

interface SubmitSelectedProps {
    selectedDate: Date,
    selectedTime: string,
    selectedSpecialist: PsychologistProps,
    onSubmit?: () => void
}

const SubmitSelected: React.FC<SubmitSelectedProps> = ({selectedDate, selectedTime, selectedSpecialist, onSubmit}) => {

    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(selectedDate);
    const inputStyle = "border border-gray-500 bg-transparent rounded-full font-serif leading-8 placeholder-gray-500 text-primary capitalize px-6 focus:ring-red focus:outline-none";

    return (
        <div className="bg-calendar-submit-section bg-cover bg-center min-h-96 w-full flex flex-col items-center">
            <figure
                className="md:flex shadow-md p-8 my-auto md:p-0 rounded-3xl"
            >
                <Image
                    src={selectedSpecialist.image}
                    alt={selectedSpecialist.name}
                    width={384}
                    height={512}
                    className="w-24 h-24 md:w-48 md:h-auto mx-auto rounded-l-3xl"
                />
                <div className="flex flex-col bg-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-r-3xl">
                    <div className='pl-5 flex justify-between bg-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-r-3xl'>
                        <div className="flex flex-col justify-center px-5 gap-3">
                            <h3 className="font-serif font-bold text-3xl">
                                {selectedSpecialist.name}
                            </h3>
                            <div
                                className="rounded-full pl-6 pr-8 py-2 pointer flex justify-stretch items-center bg-white">
                                <Status color={Color.Mint}/>
                                {selectedSpecialist.visit_type}
                            </div>
                        </div>
                        <div className={`${selectedSpecialist.bg_color} px-5 py-10 flex rounded-tr-3xl`}>
                            <div className="mx-5">
                                <p className="font-bold text-5xl">{selectedTime}</p>
                            </div>
                            <div>
                                <p className="font-bold">{dayOfWeek}</p>
                                <p className="font-bold">{selectedDate?.toLocaleDateString('ru-Ru')}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <AppointmentForm selectedDate={selectedDate} selectedTime={selectedTime}
                                             psychologistSlug={selectedSpecialist.slug}/>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    );
};

export default SubmitSelected;
