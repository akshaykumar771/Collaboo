import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/SignInScreen'
import Signup from '../screens/SignUpScreen'
import Colors from '../constants/Colors'
const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "raleway-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "roboto-regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
};
const AuthNavigatior = createStackNavigator(
  {
    Login: Login ,
    Signup:Signup 
  },
  {
    initialRouteName: 'Login',
   defaultNavigationOptions: defaultNavOptions,
      
  }
)

export default AuthNavigatior