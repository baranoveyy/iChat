import { LANGUAGE_KEYS, MASK_SYMBOL, THREE_DOT } from '../constants';
export const removeAccents = (str: string) =>
  str.replace(/[\u0300-\u036f]|/g, '')
  .replace(/ı|I/g, 'i')
  .replace(/İ/g, 'i')
  .replace(/ş|Ş/g, 's')
  .replace(/ç|Ç/g, 'c')
  .replace(/ü|Ü/g, 'u')
  .replace(/ö|Ö/g, 'o')
  .replace(/ğ|Ğ/g, 'g')
  .toLowerCase();

export const splitFromIndexes = (breakpoints: number[]) => (value: string) => {
  const splittedArray: string[] = [];

  for (let index = 0; index < breakpoints.length; index++) {
    const beginIndex = breakpoints[index - 1] || 0;
    const endIndex = breakpoints[index];

    const slicedPart = value.slice(beginIndex, endIndex);

    if (slicedPart) {
      splittedArray.push(slicedPart);
    }
  }

  return splittedArray;
};

export const capitalizeFirstLetter = (value: string, language: string) => {
  let regulatedValues = language === LANGUAGE_KEYS.TR ? value.replace(/I/g, 'ı') : value;

  regulatedValues = value.toLocaleLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ');

  return regulatedValues;
};

export const capitalizeWord = (value: string, language: string) => {
  const regulatedValues = language === LANGUAGE_KEYS.TR ? value.replace(/I/g, 'ı') : value;
  const capiatalizedWord = regulatedValues.toUpperCase();

  return capiatalizedWord;
};

export const removeSpace = (value: string) => value && value.replace(/\s/g, '');

export const checkTwoOrMoreConsecutiveInput = (enteredPassword: string) => {
  const DIFF_BTW_CONSECUTIVES = 1;
  const AHEAD_INDEX = 1;

  const DIFF_BTW_TWO_CONSECUTIVES = 2;
  const TWO_AHEAD_INDEX = 2;
  const MIN_LENGTH_FOR_CHECK = 2;
  const MIN_ALLOWED_CONSECUTIVE = 2;
  const CONSECUTIVE_COUNT = 2;

  const passwordCharacters = enteredPassword.split('');
  let numberOfConsecutives = 0;

  if (passwordCharacters.length > MIN_LENGTH_FOR_CHECK) {
    passwordCharacters.map((char, index) => {
      if ((Number(char) + DIFF_BTW_CONSECUTIVES === Number(passwordCharacters[index + AHEAD_INDEX]))
        && (Number(char) + DIFF_BTW_TWO_CONSECUTIVES === Number(passwordCharacters[index + TWO_AHEAD_INDEX]))) {
        numberOfConsecutives = numberOfConsecutives + CONSECUTIVE_COUNT;
      }
    });
  }

  return numberOfConsecutives >= MIN_ALLOWED_CONSECUTIVE;
};

export const maskUsername = (value: string) => {
  let maskedValue = value.substr(0, 3);

  for (let i = maskedValue.length; i < 15; i++) {
    maskedValue += MASK_SYMBOL;
  }

  return maskedValue;
};

export const shortenerFieldValue = (controlLength: number, value: string) => {
  return  value.length > controlLength ? value.substring(0, controlLength) + THREE_DOT : value;
};

export const getDashboardName = (name: string) => (
  name && `${name[0]}${name.slice(1).toLowerCase()}`
);
