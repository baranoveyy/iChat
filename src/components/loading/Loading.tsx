import React, { memo } from 'react';
import { View } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import LottieView from 'lottie-react-native';
import styled from 'styled-components';

import loadingImage from '../../assets/animate/loading.json';

import { RootState } from '../../store/reducers/rootReducer.js';

const LoadingView = styled(View)`
  justify-content: center;
  align-self: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
`;

const Lottie = styled(LottieView)`
  width: 125px;
`;

const Loading = () => {
  const loading = useSelector((state: RootState) => state.common.loading, shallowEqual);

  return loading ? (
    <LoadingView>
      <Lottie source={loadingImage} autoPlay loop />
    </LoadingView>
  ) : null;
};

export default memo(Loading);
