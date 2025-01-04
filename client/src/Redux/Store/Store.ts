import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   user: ""
});

const store = configureStore({
   reducer: rootReducer
});


export { store };