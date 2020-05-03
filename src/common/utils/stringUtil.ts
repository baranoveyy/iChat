import { LANGUAGE_KEYS } from '../constants';

export const capitalizeFirstLetter = (value: string, language: string) => {
  let regulatedValues = language === LANGUAGE_KEYS.TR ? value.replace(/I/g, 'ı') : value;

  regulatedValues = value.toLocaleLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ');

  return regulatedValues;
};

