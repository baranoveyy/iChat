import React, {useEffect} from 'react';

import Loading from './components/loading/Loading';
import {RootState} from './store/reducers/rootReducer';
import {useSelector} from 'react-redux';
import Toolbar from './components/toolbar/Toolbar';

const CommonWrapper = ({children}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    window.console.log('CommonWrapper DIDMOUNT');
  }, []);

  return (
    <>
      <Loading />
      {children}
      {isLoggedIn && <Toolbar />}
    </>
  );
};

export default CommonWrapper;
