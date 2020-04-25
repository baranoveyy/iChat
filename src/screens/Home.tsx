import React, { useEffect } from 'react';
import { Text } from 'react-native';

import Screen from '../components/Screen';

const Home = ({ history }) => {
  useEffect(() => {
    // Storage.get('123456.txt')
  }, []);

  return (
    <Screen navbarTitle="HOME" history={history} disablePadding>
      <Text> Welcome Home :) </Text>
    </Screen>
  );
};

export default Home;
