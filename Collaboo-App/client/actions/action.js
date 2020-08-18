import { navigate } from '../navigationRef';
import { AsyncStorage, Alert, View, Text } from 'react-native';
import registerForPushNotificationsAsync from "../services/push_notifications"

export const userPostFetch = user =>{
 
  console.log('user', JSON.stringify(user));
    return dispatch => {
        return fetch("http://81.89.193.99:3001/api/user/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(user)
          })
            //.then(response => response.json())
            .then((response) => {
              console.log(JSON.stringify(response))
              const status = response.status;
              console.log("status", status)
              if (status === 201) {
                return response.json();
              } else{
                console.log(JSON.stringify(response))
                Alert.alert(
                  JSON.stringify(response)
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
              }
            })
            .then(data => {
            
                //localStorage.setItem("token", data.token)
                console.log("whattt", JSON.stringify(data))
                //dispatch(loginUser(data))
                dispatch({type: 'LOGIN_USER', payload: data})
                saveDataToStorage(data.token, data.user._id, data.user.role)
                if(data.user){
                  navigate('StartUp')
                }
                // else if(data.user.role === 'CRAFTSMEN'){
                //   navigate('App')
                // }
                // else if(data.user.role === 'AGENT'){
                //   navigate('Agent')
                // }
            })
            .catch((e) => {console.log("error", e)})
    }
}
// const loginUser = userObj => ({
//     type: 'LOGIN_USER',
//     payload: userObj
// }, console.log("from action file",userObj))
handleError = (res) => {
  console.log("err", res)
  // Alert.alert(
  //     JSON.stringify(response)
  //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
  //     { cancelable: false }
  //   );
}
export const userLoginFetch = user => {
  //user.pushToken = await AsyncStorage.getItem('pushtoken')
  console.log('login user', user);
  return dispatch => {
    return fetch("http://81.89.193.99:3001/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
    //.then(resp => resp.json())
    .then((response) => {
      console.log(JSON.stringify(response))
      const status = response.status;
      console.log("status", status)
      if (status === 200) {
        return response.json();
      } else{
        return response.json()
      }
    })
    .then((data) => {
      console.log("respoo", data.error)
      if(data.error){
        console.log("coming ", data)
        //  Alert.alert(
        //     JSON.stringify(data.error)
        //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        //     { cancelable: false }
        //   );
        dispatch({type: 'LOGIN_USER', payload: data})
      }
      else{
        console.log("whattt", JSON.stringify(data))
          dispatch({type: 'LOGIN_USER', payload: data});
          saveDataToStorage(data.token, data.user._id, data.user.role)
          if(data.user){
            navigate('StartUp')
          }
      }
    })
   
      // .then(data => {
      //   if (data.error) {
      //     // Here you should have logic to handle invalid login credentials.
      //     // This assumes your Rails API will return a JSON object with a key of
      //     // 'message' if there is an error
      //     console.log("error data", data)
      //   } else {
      //     console.log("whattt", data)
      //     //localStorage.setItem("token", data.token)
      //     dispatch({type: 'LOGIN_USER', payload: data});
      //     saveDataToStorage(data.token, data.user._id, data.user.role)
      //     if(data.user){
      //       navigate('StartUp')
      //     }
      //   }
      // })
      .catch((response) => {console.log("login error", response.error)})
  }
}
export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = (token, userId, userRole, socket) => {
  
  return dispatch => {
    console.log("authenticate disoatch ", dispatch);
    dispatch({type: AUTHENTICATE, token : token, userId: userId, userRole: userRole, socket: socket})
  }
}
export const SOCKET = 'SOCKET';
export const socket = (socket) => {
  return dispatch => {
    dispatch({type: SOCKET, socket: socket})
  }
}
export const LOGOUT = 'LOGOUT';
export const logout = () =>{
  AsyncStorage.removeItem('token');
  return {type: LOGOUT}
}
const saveDataToStorage = (token, userId, userRole) => {
  console.log('saveDataFunction', token, userId, userRole);
  AsyncStorage.setItem('token', JSON.stringify({token: token, userId: userId, userRole: userRole}))
}