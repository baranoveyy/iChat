import React, { ReactNode } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  View,
  Text,
  ViewProps,
  KeyboardAvoidingView,
  TouchableOpacity,
  NativeModules
} from 'react-native';
import styled from 'styled-components';

import { isIos } from '../common/utils/platformUtil';
import { color } from '../common/constants';

import Header, { HeaderProps } from './header/Header';
import Loading from './loading/Loading';
import Toolbar from './toolbar/Toolbar';

import { RootState } from '../store/reducers/rootReducer';

const isDevMenuVisible = false; // to open DevMenu, make it true

const ScreenContainer = styled<{ backgroundColor?: string }>(View)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-color: ${(props) => props.backgroundColor || color.white2};
`;

const ScreenWrapper = styled<ViewProps>(({ ...rest }) =>
  isIos ? (
    <KeyboardAvoidingView behavior="padding" {...rest} />
  ) : (
    <View {...rest} />
  )
)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ScreenContentWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.disablePadding ? '0' : '10px 20px 20px'};

  background-color: ${color.white3};
`;

const DevMenuView = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

interface ScreenProps extends HeaderProps {
  backgroundColor?: string;
  disablePadding?: boolean;
  children?: ReactNode;
}

const DevMenuItem = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
    <View
      style={{
        backgroundColor: color.oceanBlue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5
      }}>
      <Text style={{ color: 'white', fontSize: 15 }}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const RenderDevMenu = () => {
  if (isDevMenuVisible) {
    const onPressIos = () => {
      NativeModules.DevMenu.show();
    };

    const onPressReload = () => {
      NativeModules.DevSettings.reload();
    };

    const onPressHotLoading = () => {
      NativeModules.DevSettings.setHotLoadingEnabled(true);
    };

    const onPressDebugJs = () => {
      NativeModules.DevSettings.setIsDebuggingRemotely(true);
    };

    return isIos ? (
      <TouchableOpacity onPress={onPressIos}>
        <View
          style={{
            backgroundColor: color.oceanBlue,
            width: 400,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{ color: 'white', fontSize: 30 }}>DEV MENU</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <DevMenuView>
        <DevMenuItem onPress={onPressReload} label="Reload" />
        <DevMenuItem onPress={onPressHotLoading} label="HotLoading" />
        <DevMenuItem onPress={onPressDebugJs} label="DebugJs" />
      </DevMenuView>
    );
  } else {
    return null;
  }
};

const Screen = (props: ScreenProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn, shallowEqual);

  return (
    <ScreenContainer backgroundColor={props.backgroundColor}>
      <Loading />
      <Header
        displayBackButton={props.displayBackButton}
        displayRightButton={props.displayRightButton}
        displaySecondRightButton={props.displaySecondRightButton}
        backButtonAction={props.backButtonAction}
        rightButton={props.rightButton}
        secondRightButton={props.secondRightButton}
        navbarTitle={props.navbarTitle || ''}
        screenType={props.screenType}
        hideCustomNavbar={props.hideCustomNavbar}
        history={props.history}
      />
      <ScreenWrapper>
        <ScreenContentWrapper disablePadding={props.disablePadding} >{props.children}</ScreenContentWrapper>
      </ScreenWrapper>
      {isLoggedIn && <Toolbar />}
      <RenderDevMenu />
    </ScreenContainer>
  );
};

export default Screen;