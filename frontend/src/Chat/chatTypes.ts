export interface Conversation {
    id?: string;
    user: string;
    title: string;
    // Add other fields as necessary
}

export interface Message {
    type: 'user' | 'ai' | 'error';
    content: string;
}

export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
