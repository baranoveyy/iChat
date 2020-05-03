import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import Screen from '../components/Screen';

import paths from '../routes/paths';
import { RootState } from '../store/reducers/rootReducer';
import { color } from '../common/constants';

const Container = styled(View)`
  flex: 1;
`;

const Chat = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  height: 60px;
  background-color: ${color.cloudyBlue};
`;

const ChatName = styled(Text)`
  width: 100%;
  height: 100%;
`;

const Chats = ({history}) => {
  const {convoLinks} = useSelector((state: RootState) => state.aws);

  useEffect(() => {
    // dispatch(getConvoLinks(currentUser.id))
  }, []);

  return (
    <Screen navbarTitle="CHATS">
      <Container>
        {convoLinks?.map((convoLink,index) => {
          window.console.log(convoLink);

          const onPress = () => {
            history.push(paths.CHAT, {convoLink})
          };

          return (
            <Chat key={index} onPress={onPress}>
              <ChatName>{convoLink.conversation.name}</ChatName>
            </Chat>
          )
        })}
      </Container>
    </Screen>
  );
};

export default Chats;
