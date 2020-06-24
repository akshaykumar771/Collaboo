import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch, connect, useSelector } from "react-redux";
import * as authActions from "../actions/action";
import userReducer from "../reducers/userReducer";
import io from "socket.io-client";
//   const socket = async () => {
//   const userData = await AsyncStorage.getItem("token");
//   const transformedData = await JSON.parse(userData);
//   const { token } = await transformedData;
//   console.log("Token", token)
 
//   console.log("Socket :", socket)
//   return socket;
// }
const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("token");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, userRole } = transformedData;
      const socket = await io.connect("http://81.89.193.99:3001/chat", {
        query: { token: token }
    });
      //console.log("startupscreen", transformedData);
      if (!token || !userId || !userRole) {
        props.navigation.navigate("Auth");
        return;
      }
      if (userRole === "CUSTOMER") {
        props.navigation.navigate("Customer");
      } else if (userRole === "CRAFTSMEN") {
        props.navigation.navigate("App");
      } else if (userRole === "AGENT") {
        props.navigation.navigate("Agent");
      }
      dispatch(authActions.authenticate(token, userId, userRole));
      dispatch(authActions.socket(socket));
    };
    tryLogin();

  }, []);



  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

// const mapStateToProps = (state) => ({
//     token: state.userReducer.token
//   });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
// export default StartUpScreen;

// import React, { Component } from "react";
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   AsyncStorage,
// } from "react-native";
// import Colors from "../constants/Colors";
// import { connect, useSelector } from "react-redux";
// import { authenticate } from "../actions/action";
// import io from "socket.io-client";
// import userReducer from "../reducers/userReducer";
// class StartUpScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidMount() {
//     const tryLogin = async () => {
//       const userData = await AsyncStorage.getItem("token");
//       if (!userData) {
//         this.props.navigation.navigate("Auth");
//         return;
//       }
//       const transformedData = JSON.parse(userData);
//       const { token, userId, userRole } = transformedData;
//       console.log("startupscreen", transformedData);
//       if (!token || !userId || !userRole) {
//         this.props.navigation.navigate("Auth");
//         return;
//       }
//       if (userRole === "CUSTOMER") {
//         this.props.navigation.navigate("Customer");
//       } else if (userRole === "CRAFTSMEN") {
//         this.props.navigation.navigate("App");
//       } else if (userRole === "AGENT") {
//         this.props.navigation.navigate("Agent");
//       }
//       this.props.authenticate(token, userId, userRole);
//     };
//     tryLogin();
//   }
  
//   render() {
//     return (
//       <View style={styles.screen}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     token: state.userReducer.token,
//   };
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default connect(mapStateToProps, { authenticate })(StartUpScreen);
//export default StartUpScreen;
