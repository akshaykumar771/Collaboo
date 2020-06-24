import React, { Component } from 'react'
import { StyleSheet, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AppNavigation from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { setNavigator } from "./navigationRef";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from 'redux-thunk';
import {userReducer} from "./reducers/userReducer";
import {chatReducer} from "./reducers/chatReducer";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
//import { store } from './Store';
class App1 extends Component {
      constructor(props) {
        super(props);
       
        this.state = {
          fontLoaded: false,
        };
      }
   
      render() {
        const fetchFont = () => {
          return Font.loadAsync({
            "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
            ralewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
            "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
            robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
            Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
          });
        };
    
        // const [fontLoaded, setFontLoaded] = useState(false);
        if (!this.state.fontLoaded) {
          return (
            <AppLoading
              startAsync={fetchFont}
              onFinish={() => this.setState({ fontLoaded: true })}
              onError={(err) => {
                console.log(err);
              }}
            />
          );
        }
        return (
          <Provider store={store}>
            <AppNavigation
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </Provider>
        );
      }
    }
    const mapStateToProps = (state) => ({
      token: state.userReducer.token,
    });
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    });
    
    export default App1;
