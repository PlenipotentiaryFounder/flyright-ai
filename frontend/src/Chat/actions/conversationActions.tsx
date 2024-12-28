import axios from 'axios';

// Define types (adjust as needed based on your actual data structures)
export interface Conversation {
  id?: string;
  title: string;
  user: string;
  // Add other properties as needed
}

export interface Message {
  id?: string;
  conversationId: string;
  content: string;
  // Add other properties as needed
}

export const createConversation = async (conversationData: Conversation): Promise<Conversation> => {
  console.log('Creating a new conversation', conversationData);
  try {
    const response = await axios.post<Conversation>('/api/conversations/', conversationData);
    console.log('Conversation created successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating conversation', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const createMessage = async (messageData: Message): Promise<Message> => {
  console.log('Creating a new message', messageData);
  try {
    const response = await axios.post<Message>(`/api/conversations/${messageData.conversationId}/add_message/`, messageData);
    console.log('Message created successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating message', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
