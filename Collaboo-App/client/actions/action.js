import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

export const userPostFetch = user =>{
  console.log('user', user);
    return dispatch => {
        return fetch("http://81.89.193.99:3001/api/user/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(user)
          })
            .then(response => response.json())
            .then(data => {
            
                //localStorage.setItem("token", data.token)
                console.log("whattt", data)
                //dispatch(loginUser(data))
                dispatch({type: 'LOGIN_USER', payload: data})
                saveDataToStorage(data.token, data.user._id, data.user.role)
                if(data.user.role === 'CUSTOMER'){
                  navigate('Customer')
                }
                else if(data.user.role === 'CRAFTSMEN'){
                  navigate('App')
                }
                else if(data.user.role === 'AGENT'){
                  navigate('Agent')
                }
            })
      
    }
}
// const loginUser = userObj => ({
//     type: 'LOGIN_USER',
//     payload: userObj
// }, console.log("from action file",userObj))

export const userLoginFetch = user => {
  console.log('user', user);
  return dispatch => {
    return fetch("http://81.89.193.99:3001/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          // Here you should have logic to handle invalid login credentials.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error
        } else {
          console.log("whattt", data)
          //localStorage.setItem("token", data.token)
          dispatch({type: 'LOGIN_USER', payload: data});
          saveDataToStorage(data.token, data.user._id, data.user.role)
          if(data.user.role === 'CUSTOMER'){
            navigate('Customer')
          }
          else if(data.user.role === 'CRAFTSMEN'){
            navigate('App')
          }
          else if(data.user.role === 'AGENT'){
            navigate('Agent')
          }
        }
      })
  }
}
export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = (token, userId, userRole) => {
  return {type: AUTHENTICATE, token : token, userId: userId, userRole: userRole}
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