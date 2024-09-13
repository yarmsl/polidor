import { memo } from 'react';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UI_URL = import.meta.env.VITE_UI_URL;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const filler = '—';

export const genericMemo: <T>(component: T) => T = memo;
