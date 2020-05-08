import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Text, View, ScrollView} from 'react-native';
import styled from 'styled-components';

import Screen from '../components/Screen';

import {getConversationAction} from '../store/actions/awsActions';
import TextField from '../components/text-field/TextField';
import {RootState} from '../store/reducers/rootReducer';
import {color} from '../common/constants';
import {API, graphqlOperation} from 'aws-amplify';
import {createMessage} from '../graphql/mutations';
import {onCreateMessage} from '../graphql/subscriptions';

const Container = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 10px;
`;

const ScrollContainer = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const MessagesContainer = styled(ScrollView)`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${color.lightSage};
`;

const MessageRowView = styled(View)`
  padding: 2px 4px;
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: ${({isCurrentUserMessage}) =>
    isCurrentUserMessage ? 'flex-end' : 'flex-start'};
`;

const MessageInnerView = styled(View)`
  border: 1px;
  border-radius: 5px;
  padding: 5px;
  width: 50%;
  height: 100%;
  background-color: ${({isCurrentUserMessage}) =>
    isCurrentUserMessage ? color.cloudyBlue : color.darkLimeGreen};
`;

const Message = styled(Text)``;

const MessageInputView = styled(View)`
  width: 100%;
  height: 50px;
  padding-top: 10px;
`;

const MessageInput = styled(TextField)``;

const Chat = ({location}) => {
  const dispatch = useDispatch<any>();
  const {currentUser} = useSelector(
    (state: RootState) => state.auth,
    shallowEqual
  );
  const [conversation, setConversation] = useState<any>();
  const [message, setMessage] = useState('');
  const ref = useRef<ScrollView>();

  useEffect(() => {
    // Storage.get('123456.txt')
    dispatch(
      getConversationAction(location.state.convoLink.conversation.id)
    ).then((response) => {
      if (!response.error) {
        setConversation(response.payload.data.getConversation);
      }
    });
  }, []);

  useEffect(() => {
    ref.current?.scrollToEnd();

    const next = (nextOnCreateMessage) => {
      window.console.log('nextOnCreateMessage', nextOnCreateMessage);
      setConversation({
        ...conversation,
        messages: {
          items: [
            nextOnCreateMessage.value.data.onCreateMessage,
            ...conversation.messages.items
          ]
        }
      });

      ref.current?.scrollToEnd();
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        messageConversationId: location?.state.convoLink.conversation.id
      })
    ).subscribe({
      next
    });

    return () => subscription.unsubscribe();
  }, [conversation, location]);

  const onChangeMessage = (text) => {
    setMessage(text);
  };

  const sendMessage = async (event) => {
    setMessage('');
    try {
      const result = await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: event.nativeEvent.text,
            messageConversationId: conversation.id,
            authorId: currentUser.id
          }
        })
      );

      window.console.log('sendMessage', result);
    } catch (error) {
      window.console.log('sendMessage error', error);
    }
  };

  return (
    <Screen navbarTitle={conversation?.name} disablePadding>
      <Container>
        <ScrollContainer>
          <MessagesContainer ref={ref}>
            {conversation?.messages.items
              .slice()
              .reverse()
              .map((message, index) => {
                const isCurrentUserMessage =
                  message.authorId === currentUser.id;

                return (
                  <MessageRowView
                    key={index}
                    isCurrentUserMessage={isCurrentUserMessage}>
                    <MessageInnerView
                      isCurrentUserMessage={isCurrentUserMessage}>
                      <Message>{message.content}</Message>
                    </MessageInnerView>
                  </MessageRowView>
                );
              })}
          </MessagesContainer>
        </ScrollContainer>
        <MessageInputView>
          <MessageInput
            placeholder="Type something..."
            value={message}
            onChangeText={onChangeMessage}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
        </MessageInputView>
      </Container>
    </Screen>
  );
};

export default Chat;
