import axios from 'axios';
import { Dispatch } from 'redux';
import { CREATE_CONVERSATION, CREATE_MESSAGE } from '../chatTypes'; // Adjust the import path as needed
import { Conversation, Message as ChatMessage } from '../chatTypes'; // Adjust the import path as needed

interface Message {
    conversationId: string;
    // ... other properties ...
}

export const createConversation = (conversationData: Conversation) => async (dispatch: Dispatch) => {
    console.log('Creating a new conversation', conversationData);
    try {
        const response = await axios.post('/api/conversations/', conversationData);
        dispatch({
            type: CREATE_CONVERSATION,
            payload: response.data,
        });
        console.log('Conversation created successfully', response.data);
    } catch (error) {
        console.error('Error creating conversation', error);
    }
};

export const createMessage = (messageData: Message) => async (dispatch: Dispatch) => {
    console.log('Creating a new message', messageData);
    try {
        const response = await axios.post(`/api/conversations/${messageData.conversationId}/add_message/`, messageData);
        dispatch({
            type: CREATE_MESSAGE,
            payload: response.data,
        });
        console.log('Message created successfully', response.data);
    } catch (error) {
        console.error('Error creating message', error);
    }
};
