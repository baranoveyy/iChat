import React from 'react';
import { View, StatusBar, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Button, Left, Right, Body } from 'native-base';
import { MemoryHistory } from 'history';

import { color } from '../../common/constants';
import { LANGUAGE_KEYS } from '../../common/constants';

import paths from '../../routes/paths';
import Navbar from '../navbar/Navbar';
import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

import innovanceLogo from '../../assets/icons/logo-innovance.png';
import iconNotification from '../../assets/icons/iconsNotificationsWhite.png';
import iconProfile from '../../assets/icons/iconsProfileWhite.png';
import iconENLanguage from '../../assets/icons/iconsEn.png';
import iconTRLanguage from '../../assets/icons/iconsTr.png';

export interface HeaderProps {
  hideCustomNavbar?: boolean;
  language?: string;
  isLoggedIn?: boolean;
  userToken?: string;
  displayBackButton?: boolean;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  navbarTitle?: string;
  rightButton?: React.ReactNode;
  secondRightButton?: React.ReactNode;
  notifications?: Notification[] | {};
  notificationsBadge?: number;
  hideNotificationButton?: boolean;
  backButtonAction?(): void;
  setNotificationBadge?(badge: number): void;
  testID?: string;
  screenType?: string;
  history: MemoryHistory;
}

const HeaderContainer = styled(View)`
  z-index: 2;
  background-color: ${color.white3};
  padding: 20px 0px 0px;
`;

const DashboardHeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NotificationBadge = styled(View)`
  top: 5;
  right: -2;

  align-items: center;
  justify-content: center;
  position: absolute;
  height: 18px;
  width: 18px;

  background: ${color.darkLimeGreen};
  border-radius: 50;
`;

const NotificationBadgeNumber = styled(TranslatedTextContainer)`
  font-size: 10;
  color: ${color.white3};
`;

const IconContainer = styled(TouchableOpacity)`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

export const HeaderRightButton = (props) => (
  <IconContainer onPress={props.onPress}>
    <Image source={props.iconSource} />
  </IconContainer>
);

const Header = (props: HeaderProps) => {
  const goToRoute = (link) => () => {
    props.history.push(link);
  };

  const defaultBackButtonAction = () => {
    window.console.log(props.history);
    props.history.goBack();
  };

  return (
    <HeaderContainer>
      <StatusBar
        translucent
        barStyle={props.hideCustomNavbar ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
       {/* <MenuContent
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.5,0.6]}
        colors={[color.oceanBlue, color.darkLimeDarkerGreen]}
       >
        <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      </MenuContent> */}
      {props.hideCustomNavbar ? (
        <DashboardHeaderContainer>
          <Left>
            {props.isLoggedIn ? (
              <Button transparent onPress={goToRoute(paths.PROFILE)}>
                <Image source={iconProfile} />
              </Button>
            ) : (
              <Button transparent onPress={() => null}>
                <Image
                  source={
                    props.language === LANGUAGE_KEYS.EN
                      ? iconTRLanguage
                      : iconENLanguage
                  }
                />
              </Button>
            )}
          </Left>
          <Body>
            <Image source={innovanceLogo} />
          </Body>
          <Right>
            {props.isLoggedIn && !props.hideNotificationButton && (
              <Button transparent onPress={goToRoute('asdasdasd')}>
                <Image source={iconNotification} />
                {props.notificationsBadge && props.notificationsBadge > 0 && (
                  <NotificationBadge>
                    <NotificationBadgeNumber
                      label={props.notificationsBadge.toString()}
                    />
                  </NotificationBadge>
                )}
              </Button>
            )}
          </Right>
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
          testID={props.testID}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
