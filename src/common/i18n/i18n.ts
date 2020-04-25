import tr from './languages/tr.json';

import store from '../../store/storeConfig';
import { LANGUAGE_KEYS, ASTERIKS } from '../constants';

export let currentLanguage: string | undefined = LANGUAGE_KEYS.TR;

let languageFile = tr;

export const setLanguageFile = (language, langFile?) => {
  if (language === LANGUAGE_KEYS.EN) {
    languageFile = langFile;
  } else {
    languageFile = tr;
  }
};

store.subscribe(() => {
  currentLanguage = store.getState().common.language;
});

const translate = (label: string, params: string[] = [], isRequired?: boolean): string => {
  let translatedString: string = languageFile[label] || label;

  params.forEach((param, paramIndex) => {
    translatedString = translatedString.replace(`{${paramIndex + 1}}`, param);
  });

  translatedString = isRequired ? translatedString + ASTERIKS : translatedString;

  return translatedString;

};

/**
 * This function returns a static string based on current language gathered from redux store.
 * It cannot track the language change. Thus cannot be updated when language changes.
 * Do NOT use this until you have no other options.
 */
export const connectedTranslate =
  (label: string, params: string[]= [], isRequired?: boolean) => translate(label, params, isRequired );
