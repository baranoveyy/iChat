/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { TextInput, Picker } from 'react-native';
import styled from 'styled-components';

import { color } from '../../common/constants';

export const StyledTextInput22 = styled(TextInput)`
  background-color: ${color.white3};
  color: ${color.black};
  width: 100%;
  height: 50px;
  margin-bottom: 10;
  border-color: ${color.oceanBlue};
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;

export interface SelectProps {
  initialValue?: any;
  value?: any;
  isSearchAvailable?: boolean;
  options: Array<{ value: any; label: string }>;
  status?: string;
  testID?: string;
  isSmall?: boolean;
  editable?: boolean;
  autoHeight?: boolean;
  width?: string;
  placeHolder?: string | boolean;
  fillParentWidth?: boolean;
}

const StyledPicker = styled(Picker)`
  height: 44px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${color.grey2};

  ${(props) => ({
    'width': props.width || '100%',
    'background-color': props.editable === false ? color.white2 : color.white3,
    'color': props.editable === false ? color.warmGrey : color.darkGrey
  })}
`;

const DropdownSelect2 = ({ options, width, initialValue }: SelectProps) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, []);

  /* eslint-disable */
  // @ts-ignore
  const onValueChange = (value, itemIndex) => {
    setValue(value);
  };

  return (
    <StyledPicker
      selectedValue={value}
      onValueChange={onValueChange}
      width={width}
    >
      {options.map(({label, value}) =>
        <Picker.Item label={label} value={value} key={value}/>
      )}
    </StyledPicker>
  );
};

export default DropdownSelect2;
