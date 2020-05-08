import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import styled from 'styled-components';
import {Left, Right, Body} from 'native-base';
import {MemoryHistory} from 'history';

import {color} from '../../common/constants';

import Navbar from '../navbar/Navbar';

import innovanceLogo from '../../assets/icons/logo-innovance.png';

export interface HeaderProps {
  hideCustomNavbar?: boolean;
  language?: string;
  isLoggedIn?: boolean;
  displayBackButton?: boolean;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  navbarTitle?: string;
  rightButton?: React.ReactNode;
  secondRightButton?: React.ReactNode;
  backButtonAction?(): void;
  screenType?: string;
  history?: MemoryHistory;
}

const HeaderContainer = styled(View)`
  z-index: 2;
  background-color: ${color.white3};
  padding: 20px 0px 5px;
  border-bottom-width: 1px;
`;

const DashboardHeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = (props: HeaderProps) => {
  const defaultBackButtonAction = () => {
    props.history?.goBack();
  };

  return (
    <HeaderContainer>
      <StatusBar
        translucent
        barStyle={props.hideCustomNavbar ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      {props.hideCustomNavbar ? (
        <DashboardHeaderContainer>
          <Left/>
          <Body>
            <Image source={innovanceLogo} />
          </Body>
          <Right />
        </DashboardHeaderContainer>
      ) : (
        <Navbar
          displayBackButton={props.displayBackButton}
          displayRightButton={props.displayRightButton}
          displaySecondRightButton={props.displaySecondRightButton}
          backButtonAction={props.backButtonAction || defaultBackButtonAction}
          rightButton={props.rightButton}
          secondRightButton={props.secondRightButton}
          navbarTitle={props.navbarTitle}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
