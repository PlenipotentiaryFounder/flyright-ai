import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createConversation } from '../../../actions/conversationActions';
import { AppDispatch } from '@/store'; // Correct path to store

const ConversationForm = () => {
    const [conversationData, setConversationData] = useState({ user: '', title: '' });

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConversationData({ ...conversationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log('Submitting conversation form', conversationData);
        dispatch(createConversation(conversationData));
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
