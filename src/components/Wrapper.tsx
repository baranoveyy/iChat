import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { font, FONT_WEIGHTS, FONT_SIZE } from '../common/font';
import { color } from '../common/constants';

import TranslatedTextContainer from './translated-text/TranslatedTextContainer';
import { FieldError } from 'react-hook-form/dist/types';

const FieldRow = styled<{ width?: string, error }>(View)`
  ${(props) => `
    width: ${props.width || '100%'};
  `};
`;

const FieldTitle = styled(TranslatedTextContainer)`
  margin: 5px 0;

  ${font('13px', FONT_WEIGHTS.BOLD)};
  color: ${color.black};
  line-height: 15px;
`;

const ErrorMessage = styled(TranslatedTextContainer)`
  margin: 0px;

  ${font(FONT_SIZE.TEN)};
  color: ${color.scarlet};
  letter-spacing: 0.6px;
`;

const ErrorContainer = styled(View)`
  margin: 6px 0;
`;

export interface WrapperProps {
  label?: string;
  children?: React.ReactChild;
  width?: string;
  height?: string;
  error?: FieldError;
  isHideErrorMessage?: boolean;
  ref?;
}

export const Wrapper = ({
  width,
  label,
  isHideErrorMessage,
  children,
  error
}: WrapperProps) => (
  <FieldRow width={width}>
    {label ? <FieldTitle label={label} /> : null}
    {children}
    {!!error && !isHideErrorMessage && (
      <ErrorContainer>
        <ErrorMessage label={error.message || error.type} />
      </ErrorContainer>
    )}
  </FieldRow>
);