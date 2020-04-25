/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { View, Picker, Image } from 'react-native';
import { FieldError } from 'react-hook-form/dist/types';

import { color } from '../../common/constants';
import { connectedTranslate } from '../../common/i18n/i18n';
import { BUTTON_TYPES } from '../../common/constants';
import { isAndroid } from '../../common/utils/platformUtil';
import { deviceVersion } from '../../common/DeviceSpecific';

import Button from '../button/Button';
import { DropdownFieldProps } from '../DropdownField';
import PickerSelect from '../picker-select/PickerSelect';

import IconArrowDown from '../../assets/icons/iconsArrowLightGrey.png';

export const isDeviceAndroidAndOlderThanVersionEight = () =>
  isAndroid && Number(deviceVersion.charAt(0)) < 8;

const StyledPicker = styled(PickerSelect)`
  height: 44px;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${color.grey2};
`;

const StyledView = styled(View)`
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${color.grey2};
`;

const DropdownIndicator = styled(Image)`
  width: 9px;
  height: 6px;

  position: absolute;
  top: 22px;
  right: 20px;
`;

interface StyledButtonProps {
  editable?: boolean;
  error?: FieldError;
}

const StyledButton = styled<StyledButtonProps>(Button)`
  ${(props) => ({
    'border-color': props.error ? color.scarlet : color.grey2,
    'background-color': props.editable === false ? color.white2 : color.white3,
    'color': props.editable === false ? color.warmGrey : color.darkGrey
  })}
`;

const defaultItem = {
  label: connectedTranslate('Please select'),
  value: null
};

const DropdownSelect = (props: DropdownFieldProps) => {
  const [item, setItem] = useState();

  useEffect(() => {
    if (props.initialValue) {
      const selected = props.initialValue;
      setItem(selected);
      props.onChange(selected);
    }
  }, []);

  // @ts-ignore Unused value
  const handleOptionSelect = (value, index) => {
    const selected = value !== null ? props.options[index - 1] : undefined;

    setItem(selected);
    props.onChange(selected);
  };

  const getSelectedLabel = (option) => option ? option.label : defaultItem.label;

  return (
    <>
      {isDeviceAndroidAndOlderThanVersionEight() ? (
        <StyledView>
          <Picker
            selectedValue={item && item.value}
            style={{ width: '1000' }}
            onValueChange={handleOptionSelect}>
            <Picker.Item
              label={connectedTranslate('general_components_pleaseSelect_text')}
              value={null}
            />
            {props.options.map((item, index) => (
              <Picker.Item
                label={connectedTranslate(item.label)}
                value={item.value}
                key={index}
              />
            ))}
          </Picker>
          <DropdownIndicator source={IconArrowDown} />
        </StyledView>
      ) : (
        <StyledPicker
          value={item ? item.value : null}
          onValueChange={handleOptionSelect}
          items={props.options.map((item) => ({
            value: item.value,
            label: connectedTranslate(item.label)
          }))}
          placeholder={defaultItem}
          disabled={props.editable === false}>
          <StyledButton
            buttonType={BUTTON_TYPES.FORM}
            iconSource={IconArrowDown}
            iconPosition="right"
            iconWidth="9"
            iconHeight="5"
            label={getSelectedLabel(item)}
            editable={props.editable}
            error={props.error}
            removeDelayOnPress
          />
        </StyledPicker>
      )}
    </>
  );
};

export default DropdownSelect;
