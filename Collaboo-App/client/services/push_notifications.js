import { AsyncStorage, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import Constants from 'expo-constants';
export const registerForPushNotificationsAsync = async () => {
  console.log("inside push notifications");
  //return new Promise((resolve, reject) => {
  let previousToken = await AsyncStorage.getItem("pushtoken");
  // if(previousToken !== null){
  //     console.log("previous token", previousToken)
  //     return resolve(previousToken);
  // }
  if (previousToken) {
      console.log("previous token", previousToken)
    return previousToken;
  }
//   } else {
    // let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // console.log("inside else", status);
    // if (status !== "granted") {
    //   return;
    // }
    if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status;
            }
            if (finalStatus !== 'granted') {
              alert('Failed to get push token for push notification!');
              return;
            }
            token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            AsyncStorage.setItem("pushtoken", token);
            return token
            //this.setState({ expoPushToken: token });
          } else {
            alert('Must use physical device for Push Notifications');
          }

    // let token = await Notifications.getExpoPushTokenAsync();
    // console.log("pushtoken", token);
    // AsyncStorage.setItem("pushtoken", token);
    // return token;
};
//})

// const bearer = "Bearer " + props.token;
//      await fetch(apiUrl, {
//         method: "POST",
//         body: JSON.stringify({token}),
//         headers: {
//           Authorization: bearer,
//         },
//       })
//         //.then((response) => response.json())
//         .then((response) => {
//           console.log("response from inventory", response);
//         })
//         .catch((E) => {
//           console.log(E);
//         });
//      console.log("push token", token)
// if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync();
//     console.log(token);
//     //this.setState({ expoPushToken: token });
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.createChannelAndroidAsync('default', {
//       name: 'default',
//       sound: true,
//       priority: 'max',
//       vibrate: [0, 250, 250, 250],
//     });
//   }

// const mapStateToProps = (state) => ({
//     token: state.userReducer.token,
//     userId: state.userReducer.userId
//   });

// export default connect(mapStateToProps, null)(registerForPushNotificationsAsync)
