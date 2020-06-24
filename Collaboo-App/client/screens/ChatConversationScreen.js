import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
class ChatConversationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!",
  });
  constructor(props) {
    //console.log("socket", props.socket);
    super(props);
    this.state = {
      messages: [],
      userId: props.userId,
      socket: props.socket,
    };

    this.postUserChats = this.postUserChats.bind(this);
    // this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
  }
  componentDidMount() {
    this.getUserChats();
  }
  async receiveSockets(socket) {
    const userId = this.props.navigation.getParam("userId");
    return await socket.on("action", (action) => {
      console.log("action", action);
      switch (action.type) {
        case "messages": {
          const gcmMessages = action.data.data.messages.map((chatMessage) => {
            let gcm = {
              _id: chatMessage._id,
              text: chatMessage.msgtext,
              createdAt: chatMessage.createdAt,
              user: {
                _id: chatMessage.senderid,
              },
            };
            return gcm;
          });
          this.setState({
            messages: gcmMessages,
          });
          break;
        }
        case "messageSent": {
          if (action.data.data != undefined)
            socket.messageSent = action.data.data;
          break;
        }
        case "sendMessage": {
          console.log("from case sendmesg", action.data);
          if (action.data.from === userId) {
            this._storeMessages([{ text: action.data.message }]);
          }
        }
      }
    });
  }
  getUserChats() {
    const userId = this.props.navigation.getParam("userId");
    console.log("userid: ", userId);
    // const messages = this.state.messages
    const data = { toUserId: userId };
    const action = { type: "chat:chat/messages/get", data: data };
    this.state.socket.emit("action", action);
    this.receiveSockets(this.state.socket);
    this.state.socket.on("error", (error) => {
      console.log("from chat conv", error);
    });
  }
  async postUserChats(message) {
    const userId = this.props.navigation.getParam("userId");
    console.log("userid: ", userId);
    const data = {
      toUserId: userId,
      messageInfo: { text: message.text },
    };
    const action = { type: "chat:chat/message/post", data: data };
    this.state.socket.emit("action", action);

    const socket = await this.receiveSockets(this.state.socket);
    console.log("inside postfunc :", this.state.socket);
    return socket;
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  async onSend(messages = []) {
    console.log("message", messages);
    // this.state.socket.emit('message', messages[0]);
    const messageSent = await this.postUserChats(messages[0]);
    if (messageSent) {
      this._storeMessages(messages);
    } else {
      console.log("error");
    }
  }

  render() {
    console.log("from userId :", this.state.userId);
    const userId = { _id: this.state.userId || -1 };
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: "white",
                  },
                  left: {
                    color: "black",
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#D6D6D6",
                  },
                  right: {
                    backgroundColor: Colors.primary,
                  },
                }}
              />
            );
          }}
          user={userId}
          inverted={false}
        />
        {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
      </View>
    );
  }

  // Helper functions
  _storeMessages(messages) {
    console.log("previousState", this.state.messages);
    console.log("store messages", messages);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}
const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  userId: state.userReducer.userId,
});
const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  ScrollView: {
    flexGrow: 1,
  },
});
export default connect(mapStateToProps, null)(ChatConversationScreen);
