import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch } from "react-redux";

SingleChatScreen.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("name"),
});

export default function SingleChatScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) =>
          dispatch({
            type: "chat:chat/message/post",
            data: { text: messages[0].text, to: navigation.getParam("userId") },
          })
        }
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
