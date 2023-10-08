import { testPattern } from 'quasar/src/utils/patterns.js';
export const required = (fieldName) => (val) =>  (val !== undefined && val !== null && val !== '') || `${fieldName} is required`;

export const email = (val) => testPattern.email(val) || 'Please enter a valid email';
