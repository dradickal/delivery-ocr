import { createContext } from 'react';

export const emptyError = {
    message: null,
    data: null,
};

export const ErrorContext = createContext(emptyError);