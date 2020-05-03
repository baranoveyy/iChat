import React from 'react';

import { View, Image } from 'react-native';
import { Button, Left, Right, Body } from 'native-base';
import styled from 'styled-components';

import {color} from '../../common/constants';

import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

import iconBack from '../../assets/icons/iconsBackDarkGrey.png';

const NavbarContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  height: 44px;
`;

const BackButton = styled(Button)`
  height: auto;
  padding: 15px 15px 15px 0px;
`;

const StyledBody = styled(Body)`
  min-width: 200px;
  align-items: center;
  justify-content: center;
`;

const NavbarTitle = styled(TranslatedTextContainer)`
  font-size: 13px;
  color: ${color.darkGrey};
`;

const RightSection = styled(Right)`
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonContainer = styled(View)`
  min-width: 50px;
  align-items: flex-end;

`;

const SecondButtonContainer = styled(ButtonContainer)`
  margin-right: -15px;
  align-items: flex-end;
`;

interface NavbarProps {
  displayBackButton?: boolean;
  backButtonAction?(): void;
  navbarTitle?: string;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  rightButton?: React.ReactNode;
  secondRightButton?: React.ReactNode;
  testID?: string;
}

const Navbar = (props: NavbarProps) => (
  <NavbarContainer>
    <Left>
      {props.displayBackButton ? (
        <BackButton testID={`${props.testID}_back`} transparent onPress={props.backButtonAction}>
          <Image source={iconBack} />
        </BackButton>
      ) : null}
    </Left>
    <StyledBody>
      <NavbarTitle label={props.navbarTitle} />
    </StyledBody>
    <RightSection>
      {props.displaySecondRightButton &&
        <SecondButtonContainer>
          {props.secondRightButton}
        </SecondButtonContainer>
      }
      {props.displayRightButton &&
        <ButtonContainer>
          {props.rightButton}
        </ButtonContainer>
      }
    </RightSection>
  </NavbarContainer>
);

export default Navbar;
