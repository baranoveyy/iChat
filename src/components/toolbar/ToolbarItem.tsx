import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import styled from 'styled-components';

import {color} from '../../common/constants';

import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

const FooterButton = styled(Button)`
  padding: 0;
  padding-top: 3px;
  border-radius: 0;
  background-color: transparent;
  justify-content: flex-start;
`;

const ButtonText = styled<{ active?: boolean }>(TranslatedTextContainer)`
  padding: 10px;
  background-color: transparent;

  letter-spacing: 0.5px;
  color: ${({active}) => (active ? color.oceanBlue : color.darkGrey)};
  font-size: 20px;
`;

const ActiveIndicator = styled(View)`
  height: 3px;
  width: 100%;
  margin-bottom: -2px;
  background-color: ${color.oceanBlue};

  shadow-opacity: 0.3;
  shadow-radius: 10px;
  shadow-color: ${color.oceanBlue};
  shadow-offset: 5px 5px;
`;

interface ToolbarItemProps {
  label: string;
  onPress(): void;
  active?: boolean;
}

const ToolbarItem = ({onPress, active, label}: ToolbarItemProps) => (
  <FooterButton onPress={onPress}>
    {active && <ActiveIndicator />}
    <ButtonText label={label} active={active} />
  </FooterButton>
);

export default ToolbarItem;
