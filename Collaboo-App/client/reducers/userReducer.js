//import { AUTHENTICATE } from '../actions/action'
const initState = {
    currentUser: {},
    token: null,
    userId: null,
    userRole: null,
    socket: null,
    loginError:"",
    signupError:""
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            // if(action.payload.token){
            //     AsyncStorage.setItem('token', action.payload.token)
            // }
            //console.log("actionnnn", action.payload)
           
          return {...state, currentUser: action.payload.user, token: action.payload.token, loginError:"", signupError:""}
          
          case 'LOGIN_USER_ERROR' :
            console.log("actionnnn", action.payload)
          return {...state, loginError: action.payload.error }
          case 'SIGNUP_USER_ERROR' : 
          return {...state, signupError: action.payload.error }
          case 'AUTHENTICATE':
            //console.log("Reducer::: ", action);
              return {
                token: action.token,
                userId: action.userId,
                userRole: action.userRole
              }

          case 'SOCKET' :
            return {...state, socket: action.socket}
          
          case 'LOGOUT':
              return initState;
          
        default:
          return state;
      }
}

//export default userReducer;