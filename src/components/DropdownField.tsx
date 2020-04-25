import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

import { Wrapper, WrapperProps } from '../components/Wrapper';
import DropdownSelect from '../components/dropdown-select/DropdownSelect';

export interface DropdownFieldProps extends WrapperProps {
  initialValue?: any; // eslint-disable-line
  options: Array<{ value: any; label: string }>; // eslint-disable-line
  placeholder?: string | boolean;
  editable?: boolean;
  error?: FieldError;
  onChange(value);
}

const DropdownField = (props) => {
  const {
    label,
    options,
    width,
    isHideErrorMessage,
    ...rest
  } = props;

  return (
    <Wrapper
      label={label}
      width={width}
      error={props.error}
      isHideErrorMessage={isHideErrorMessage}>
      <DropdownSelect {...rest} options={options || []} />
    </Wrapper>
  );
};

export default DropdownField;
