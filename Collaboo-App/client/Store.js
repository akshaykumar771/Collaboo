import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from 'redux-thunk';
import {userReducer} from "./reducers/userReducer";
import {chatReducer} from "./reducers/chatReducer";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { AsyncStorage } from "react-native";
//export const store = createStore(combineReducers({userReducer, chatReducer}), applyMiddleware(ReduxThunk));
// let token;
// store.subscribe(() => {
//     token = store.getState().userReducer.token;
//     console.log("new state", token);
//   });
// const userToken = AsyncStorage.getItem('token');
// const storedToken = JSON.parse(userToken);
// console.log("Async", stored);
  // const token = store.getState().userReducer.token;
  // console.log("From Store :", token)
  // const user = setTimeout(() => {
  //   return store.getState().userReducer.token}, 3000)
// const socket = io.connect('http://81.89.193.99:3001/chat', {
//     query: {token: userToken}
//    })

  //const socketIoMiddleware = createSocketIoMiddleware(socket, "chat:");
//   class Store extends Component {
//       constructor(props){
//           super(props);
//           this.state ={}
//       }
//       render(){
//           return(
//             <Provider store={store}>
//             <App />
//             </Provider>
//           )
//       }
//   }
// export default Store;