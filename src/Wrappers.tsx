import React from 'react';
import {Provider} from 'react-redux';

import ErrorBoundary from '../src/components/ErrorBoundary';
import CommonWrapper from './CommonWrapper';

import store from '../src/store/storeConfig';

const Wrappers = ({children}) => (
  <Provider store={store}>
    <ErrorBoundary>
      <CommonWrapper>{children}</CommonWrapper>
    </ErrorBoundary>
  </Provider>
);

export default Wrappers;
