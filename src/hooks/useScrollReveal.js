import { useRef } from 'react';

// Scroll reveal is disabled — all sections are static and immediately visible.
export function useScrollReveal() {
  return useRef(null);
}
