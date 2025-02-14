'use client';

import { useEffect, useState } from 'react';
import type { Psychologist } from '@/app/types/appointment';
import type { ApiResponse } from '@/app/types/api';
import { ERRORS } from '@/app/constants/errors';

type PsychologistSelectorProps = {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
};

type FetchState = {
  data: Psychologist[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FetchState = {
  data: [],
  isLoading: true,
  error: null,
};

export default function PsychologistSelector({ selectedId, onSelect }: PsychologistSelectorProps) {
  const [state, setState] = useState<FetchState>(initialState);
  const { data: psychologists, isLoading, error } = state;

  useEffect(() => {
    async function loadPsychologists() {
      try {
        const response = await fetch('/api/psychologists');
        if (!response.ok) {
          throw new Error(ERRORS.FETCH.PSYCHOLOGISTS);
        }
        const result: ApiResponse<Psychologist[]> = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }

        setState(prev => ({ 
          ...prev, 
          data: result.data ?? [], 
          isLoading: false 
        }));
      } catch (error) {
        console.error('Error loading psychologists:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : ERRORS.GENERIC.LOADING,
          isLoading: false,
        }));
      }
    }

    void loadPsychologists();
  }, []);

  if (error) {
    return (
      <div className="text-sm text-red-600" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <div className="animate-pulse h-10 w-48 bg-gray-200 rounded-md" />;
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="psychologist-select" className="text-sm font-medium text-gray-700">
        Психолог:
      </label>
      <select
        id="psychologist-select"
        value={selectedId ?? ''}
        onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : null)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
      >
        <option value="">Все психологи</option>
        {psychologists.map((psych) => (
          <option key={psych.id} value={psych.id}>
            {psych.name}
          </option>
        ))}
      </select>
    </div>
  );
}
