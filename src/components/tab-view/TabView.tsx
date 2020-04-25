/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType } from 'react';
import { View, Dimensions, ViewStyle, ScrollView } from 'react-native';
import { TabView as NativeTabView, TabBar } from 'react-native-tab-view';
import styled from 'styled-components';

import { color } from '../../common/constants';
import { FONT_WEIGHTS, font } from '../../common/font';

import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

const TAB_HEIGHT = 80;

const tabBarStyle: ViewStyle = {
  height: 44,
  backgroundColor: color.white3,
  borderBottomColor: color.white,
  borderBottomWidth: 1,
  elevation: 0
};

const indicatorStyle: ViewStyle = {
  height: 3,
  marginBottom: -1,
  backgroundColor: color.iChatPink,

  shadowColor: color.oceanBlue,
  shadowOffset: {
    width: 5,
    height: 5
  },
  shadowOpacity: 0.25,
  shadowRadius: 15
};

const tabStyle: ViewStyle = {
  height: 44,
  backgroundColor: 'transparent'
};

const TabLabel = styled<{ active: boolean }>(TranslatedTextContainer)`
  ${font('12px', FONT_WEIGHTS.BOLD)};
  color: ${(props) => (props.active ? color.iChatPink : color.iChatLightGrey)};
`;

const TabIndicatorView = styled(View)`
  width: 100%;
  height: 80px;
  padding: 20px;

  background-color: ${color.white2};

  align-items: center;
`;

const ActiveTabTitle = styled(TranslatedTextContainer)`
  ${font('15px', FONT_WEIGHTS.BOLD)};
  color: ${color.darkGrey};
  line-height: 18px;
  margin-bottom: 10px;
`;

const TabIndicatorList = styled(View)`
  flex-direction: row;
`;

const TabIndicator = styled<{ active?: boolean }>(View)`
  width: ${(props) => (props.active ? '12px' : '6px')};
  height: 6px;
  border-radius: 3px;

  margin: 0 3px;

  background-color: ${(props) => (props.active ? color.oceanBlue : color.black)};
`;

const MAX_TAB_LENGTH = 3;

export interface Tab {
  title: string;
  component: ComponentType<any>;
}

export interface TabMap {
  [key: string]: Tab;
}

interface TabViewProps {
  readonly tabs: TabMap;
  onIndexChange?(index: number, key: string): void;
  initialTabIndex?: number;
  locationStateKey?: string;
  swipeEnabled?: boolean;
  tabIndicatorType?: 'pageCount' | 'pointCursor';
}

const initialLayout = { width: Dimensions.get('window').width };

const TabView = (props: TabViewProps) => {
  const [index, setIndex] = React.useState(0);
  const routes = Object.keys(props.tabs).map((key: string) => ({
    key,
    title: props.tabs[key].title
  }));

  const routeMap = new Map<number, number>();

  const onLayout = (event, route) => {
    const { height } = event.nativeEvent.layout;
    const stateIndex = routes.findIndex((myRoute) => myRoute.key === route.key);
    if (height) {
      routeMap.set(stateIndex, height);
    }
  };

  const renderScene = ({ route }) => {
    const { component: TabScene } = props.tabs[route.key];
    const onLayout2 = (event) => {
      onLayout(event, route);
    };

    return (
      // <ScrollView scrollEnabled={false} >
        <View onLayout={onLayout2}>
          <TabScene />
        </View>
      // </ScrollView>
    );
  };

  const tabIndicator = () => (
    <TabIndicatorList>
      {routes.map((route, index) => (
        <TabIndicator key={route.key} active={index === index} />
      ))}
    </TabIndicatorList>
  );

  const renderLabel = (props) => (
    <TabLabel
      label={props.route.title}
      active={props.route.key === routes[index].key}
    />
  );

  const renderTabBar = (props) => (
    <>
      {routes.length > MAX_TAB_LENGTH ? (
        <TabIndicatorView>
          <ActiveTabTitle label={routes[index].title} />
          {tabIndicator()}
        </TabIndicatorView>
      ) : (
        <TabBar
          {...props}
          style={tabBarStyle}
          indicatorStyle={indicatorStyle}
          tabStyle={tabStyle}
          renderLabel={renderLabel}
          onTabPress={(asd) => {
            // window.console.log(asd);
          }}
        />
      )}
    </>
  );

  const tabHeight = routeMap.get(index);
  const tabViewStyle = [
    {
      height:
        tabHeight === 0 || tabHeight === undefined
          ? undefined
          : tabHeight + TAB_HEIGHT
    }
  ];

  return (
    <NativeTabView
      style={tabViewStyle}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      initialLayout={initialLayout}
    />
  );
};

export default TabView;
