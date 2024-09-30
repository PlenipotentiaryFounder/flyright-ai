import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
// import someReducer from '../features/someFeature/someSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // someFeature: someReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
