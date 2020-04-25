/* eslint-disable no-useless-escape */
export const alphabeticRegex = /^[çÇıİöÖşŞüÜğĞa-zA-Z ]*$/;

export const numericRegex = /^[0-9]*$/;

export const amountRegex = /^[0-9,.]*$/;

// eslint-disable-next-line max-len
export const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export const alphanumericRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9,. ]+$/i;

export const alphanumericRegexWithDash = /^[çÇıİöÖşŞüÜğĞa-z0-9-,. ]+$/i;

export const leadingSpace = /^\s+/;

export const TCKN = /^[1-9][0-9]*$/;

export const YKN = /^9[0-9]*$/;

export const ibanRegex = /^[0-9]*$/;

export const swiftIbanCountryCodeRegex = /^[a-zA-Z]+$/i;

export const swiftIbanRegex = /^[a-zA-Z0-9]+$/i;

export const swiftCodeRegex = /^[a-zA-Z0-9]*$/;

export const phoneCountryCodeRegex = /^[0-9+]*$/;

export const phoneNumberRegex = /^[0-9]*$/;

export const addressRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9-,./:() ]+$/i;

export const tripleNumericRegex = /\B(?=(\d{3})+(?!\d))/g;

export const leadingZerosRegex = /^[0]+/;

export const decimalRegex = /[^\d]/;

export const decimalAndCommaRegex = /[^\d\,]/g;

export const decimalAndDotRegex = /[^\d\.]/g;

export const accountNumberRegex = /^[A-Z0-9]*$/;

export const alphanumericWithHyphenRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9,.\- ]+$/i;

export const licencePlateLettersRegex = /^[a-zA-Z ]*$/;

export const licensePlateNumbersAndLettersRegex = /^(\w{1,3}\d{2,5})$/;

export const licencePlateAlphanumericLengthRegex = /\b[a-zA-Z0-9]{5,6}\b/;

export const decimalWithDotAndCommaRegex = /[^\d\.\,]/g;

export const commaRegex = /\,/g;

export const dotRegex = /\./g;

export const commaOrDotRegex = /[\.\,]/g;

export const smsOtpVerificationCodeRegex = /\b\d{8}\b/;

export const swiftReferenceRegex = /^[a-zA-Z0-9]*$/;

export const ipRegex = /(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/;

export const specialCharactersRegex = /[-!@#'"`/$£€~#_%^½&+*(),.?":;{}[|<>\\\]]/g;

export const accountNickNameRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9-,./:() ]+$/i;
