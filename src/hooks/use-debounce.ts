
"use client";

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Imposta un timeout per aggiornare il valore debounced dopo il ritardo specificato
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Annulla il timeout se il valore cambia (es. l'utente continua a digitare)
    // Questo evita che il valore debounced si aggiorni mentre l'input è ancora in fase di modifica
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Riesegue l'effetto solo se il valore o il ritardo cambiano

  return debouncedValue;
}
