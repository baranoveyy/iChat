import React from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import { Button } from 'native-base';
import styled from 'styled-components';

import {color} from '../../common/constants';
import { font, FONT_SIZE } from '../../common/font';
import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

const FooterButton = styled(Button)`
  padding: 0;
  padding-top: 3px;
  border-radius: 0;
  background-color: transparent;
  justify-content: flex-start;
`;

interface ButtonImageProps {
  primary?: boolean;
}

const ButtonImage = styled<ButtonImageProps>(Image)`
  margin-top: 12px;
  ${(props) => ({
    'margin-bottom': props.primary ? '4px' : 0,
    'width': props.primary ? '18px' : '22px',
    'height': props.primary ? '18px' : '22px',
    'top': props.primary ? '-20px' : 0
  })};
`;

const ButtonText = styled<{ active?: boolean }>(TranslatedTextContainer)`
  padding: 0;
  margin-top: 6px;
  background-color: transparent;

  letter-spacing: 0.5px;
  color: ${(props) => (props.active ? color.oceanBlue : color.darkGrey)};
  ${font(FONT_SIZE.TEN)};
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

// TODO: (sarioglum) Android clips overflow, find solution
const Diamond = styled(View)`
  position: absolute;
  top: -16px;
  width: 40px;
  height: 40px;
  background-color: ${color.oceanBlue};
  border-radius: 2px;
  transform: rotate(45deg);

  shadow-opacity: 0.3;
  shadow-radius: 15px;
  shadow-color: ${color.oceanBlue};
  shadow-offset: 5px 5px;
`;

interface ToolbarItemProps {
  label: string;
  icon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
  onPress?(): void;
  active?: boolean;
  primary?: boolean;
}

const ToolbarItem = ({onPress, active, primary, activeIcon, icon, label}: ToolbarItemProps) => (
  <FooterButton onPress={onPress}>
    {active && <ActiveIndicator />}
    {primary && <Diamond />}
    <ButtonImage source={active && !primary ? activeIcon : icon} primary={primary} />
    <ButtonText label={label} active={active} />
  </FooterButton>
);

export default ToolbarItem;
