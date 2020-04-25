import React from 'react';
import { Text, TextStyle } from 'react-native';

import { connectedTranslate } from '../../common/i18n/i18n';
import { capitalizeFirstLetter } from '../../common/utils/stringUtil';

export interface TranslatedTextProps {
  label?: string;
  language: string;
  params?: string[];
  style?: TextStyle;
  isRequired?: boolean;
  isCapitalizedFirstLetter?: boolean;
}

const TranslatedText = (props: TranslatedTextProps) => {
  const { label, language, params, isRequired, isCapitalizedFirstLetter, ...otherProps } = props;
  const text = connectedTranslate(label || '', params, isRequired);

  return (
    <Text {...otherProps} testID={`${label}`}>
      {isCapitalizedFirstLetter ? capitalizeFirstLetter(text, language) : text}
    </Text>
  );
};

export default TranslatedText;
