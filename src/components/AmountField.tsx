import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { Wrapper, WrapperProps } from './Wrapper';
import AmountInput, { AmountInputProps } from './AmountInput';

const TextInputInnerView = styled(View)`
  flex-direction: row;
  flex: 1;
  align-items: center;

  padding: 2px;
`;

const StyledAmountInput = styled(AmountInput)`
  ${(props) => ({
    'flex': props.icon ? 0.8 : 1
  })};
`;

const IconWrapper = styled(View)`
  justify-content: center;
  flex: 0.2;
`;

interface AmountFieldProps extends AmountInputProps, WrapperProps {}

const AmountField = (props: AmountFieldProps) => {
  const { label, width, isHideErrorMessage, ...rest } = props;

  return (
    <Wrapper
      label={label}
      width={width}
      error={props.error}
      isHideErrorMessage={isHideErrorMessage}>
      <TextInputInnerView>
        <StyledAmountInput {...rest} />
        {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
      </TextInputInnerView>
    </Wrapper>
  );
};

export default AmountField;
