import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch } from "react-redux";

SingleChatScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("name")
});

export default function SingleChatScreen({navigation}) {
  // const [messageToSend, setMessageToSend] = useState("");
  // const [recvMessages, setRecvMessages] = useState([]);
  // const socket = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   socket.current = io("http://81.89.193.99:3001");
  //   socket.current.on("message", message => {
  //     setRecvMessages(prevState => GiftedChat.append(prevState, message));
  //   });
  // }, []);

  // const onSend = messages => {
  //   console.log(messages);
  //   socket.current.emit("message", messages[0].text);
  // };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={recvMessages}
        onSend={messages => dispatch({
          type: "chat:chat/message/post",
          data: {text: messages[0].text, to: navigation.getParam("userId")}
        })}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}