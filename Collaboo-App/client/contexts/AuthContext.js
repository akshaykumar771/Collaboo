import createDataContext from "./createDataContext";
import signUpApi from "../api/signUpApi";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try{
      const response = await signUpApi.get('/api/user/login', {email, password})
      console.log(response.data)
    } catch(err){
      console.log(err.message);
    }
  };
};

const signout = (dispatch) => {
  return () => {
    //signout
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout },
  { isSignedIn: false }
);
