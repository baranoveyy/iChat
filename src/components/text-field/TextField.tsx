import React, { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form/dist/types';

import { color, DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../common/constants';
import { Wrapper } from '../Wrapper';

const StyledTextInput = styled(TextInput)`
  ${(props) => ({
    'width': props.width || DEFAULT_WIDTH,
    'height': props.height || DEFAULT_HEIGHT,
    'flex': props.icon ? '0.8' : '1',
    'border-color': props.error ? color.scarlet : color.grey2
  })};

  background-color: ${color.white3};
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;

const TextInputInnerView = styled(View)`
  flex-direction: row;
  align-items: center;

  padding: 2px;
`;

const IconWrapper = styled(View)`
  justify-content: center;
  flex: 0.2;
`;

interface TextFieldProps extends TextInputProps {
  label?: string;
  icon?: ReactNode;
  placeholder?: string;
  value?: string;
  width?: string;
  wrapperWidth?: string;
  height?: string;
  isRequired?: boolean;
  isHideErrorMessage?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  ref?;
  error?: FieldError;
}

const TextField = (props: TextFieldProps) => {
  const { label, width, height, icon, error, isHideErrorMessage, ...rest } = props;

  return (
    <Wrapper
      label={label}
      width={width}
      error={error}
      isHideErrorMessage={isHideErrorMessage}>
      <TextInputInnerView>
        <StyledTextInput {...{width, height, icon, error, ...rest}} />
        {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
      </TextInputInnerView>
    </Wrapper>
  );
};

export default TextField;
