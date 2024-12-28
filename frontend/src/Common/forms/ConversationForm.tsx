import React, { useState } from 'react';

interface ConversationData {
  user: string;
  title: string;
}

interface ConversationFormProps {
  onSubmit: (data: ConversationData) => void;
}

const ConversationForm: React.FC<ConversationFormProps> = ({ onSubmit }) => {
    const [conversationData, setConversationData] = useState<ConversationData>({ user: '', title: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConversationData({ ...conversationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting conversation form', conversationData);
        onSubmit(conversationData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="user"
                value={conversationData.user}
                onChange={handleChange}
                placeholder="User"
            />
            <input
                type="text"
                name="title"
                value={conversationData.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <button type="submit">Create Conversation</button>
        </form>
    );
};

export default ConversationForm;
