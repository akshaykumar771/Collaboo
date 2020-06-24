import React, { Component } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { thunk as ReduxThunk } from 'redux-thunk';
import { userReducer } from "./reducers/userReducer";
import { chatReducer } from "./reducers/chatReducer";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";


export const store = applyMiddleware(thunk)(createStore)(
  combineReducers({ userReducer, chatReducer })
);
store.subscribe(() => {
  let abc = store.getState().userReducer;
  //console.log("new client state", abc);
});
