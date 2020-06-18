//import { AUTHENTICATE } from '../actions/action'
const initState = {
    currentUser: {},
    token: null,
    userId: null,
    userRole: null
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            // if(action.payload.token){
            //     AsyncStorage.setItem('token', action.payload.token)
            // }
          return {...state, currentUser: action.payload.user, token: action.payload.token}
          case 'AUTHENTICATE':
            console.log("Reducer::: ", action);
              return {
                token: action.token,
                userId: action.userId,
                userRole: action.userRole
              }
          
          case 'LOGOUT':
              return initState;
          
        default:
          return state;
      }
}

//export default userReducer;