import {ActionCreator} from '../models/action';
import {API, graphqlOperation} from 'aws-amplify';
import {createConversation} from '../../graphql/mutations';
import {CreateConversationInput} from '../../API';
import {
  listConversations,
  listConvoLinks,
  getConversation
} from '../../graphql/queries';

export enum AWS_ACTION_TYPE {
  CREATE_CONVERSATION = '@@aws/CREATE_CONVERSATION',
  GET_CONVERSATIONS = '@@aws/GET_CONVERSATIONS',
  GET_CONVERSATION = '@@aws/GET_CONVERSATION',
  GET_CONVO_LINKS = '@@aws/GET_CONVO_LINKS',
  SET_CONVO_LINKS = '@@aws/SET_CONVO_LINKS',
}

export const createConversationAction: ActionCreator = (
  input: CreateConversationInput
) => ({
  type: AWS_ACTION_TYPE.CREATE_CONVERSATION,
  payload: API.graphql(graphqlOperation(createConversation, {input}))
});

export const getConversations: ActionCreator = (name?) => ({
  type: AWS_ACTION_TYPE.GET_CONVERSATIONS,
  payload: API.graphql(graphqlOperation(listConversations, {
    filter: {
      or: [
        {
          name: {eq: name}
        }
      ]
    }
  }))
});

export const getConvoLinks: ActionCreator = (convoLinkUserId?) => ({
  type: AWS_ACTION_TYPE.GET_CONVO_LINKS,
  payload: API.graphql(
    graphqlOperation(listConvoLinks, {
      filter: {
        or: [
          {
            convoLinkUserId: {eq: convoLinkUserId}
          }
        ]
      }
    })
  )
});

export const setConvoLinks: ActionCreator = (convoLinks) => ({
  type: AWS_ACTION_TYPE.SET_CONVO_LINKS,
  payload: convoLinks
});

export const getConversationAction: ActionCreator = (id) => ({
  type: AWS_ACTION_TYPE.GET_CONVERSATION,
  payload: API.graphql(graphqlOperation(getConversation, {id}))
});
