const initState = {
  selfUser: null,
};

export const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case "self_user":
      // if(action.payload.token){
      //     AsyncStorage.setItem('token', action.payload.token)
      // }
      return { ...state, selfUser: action.data };
    default:
        return state;
  }
};
