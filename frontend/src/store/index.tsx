import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
// For example:
// import userReducer from './slices/userSlice';
// import flashcardReducer from './slices/flashcardSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // For example:
    // user: userReducer,
    // flashcards: flashcardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
