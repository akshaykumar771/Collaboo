import React from "react";
import { View, Text, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
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
      toUserID: this.props.navigation.getParam("userId")
    };
    this.postUserChats = this.postUserChats.bind(this);
    // this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.receiveSockets = this.receiveSockets.bind(this);
    props.socket.on('action', this.receiveSockets);
    props.socket.on("error", (error) => {
      console.log("from chat conv", error);
    });
  }
  componentDidMount() {
    this.getUserChats();
  }
  
   receiveSockets(action) {
    //const toUserId = this.props.navigation.getParam("userId");
    //console.log("toUserID in recieve", this.state.toUserID)
    // return await socket.on("action", (action) => {
      //console.log("recieve sockets", action);
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
            messages: gcmMessages.reverse(),
          });
          console.log("from messages state:", this.state.messages)
          break;
        }
        case "messageSent": {
          console.log("from message sent: ", action.data)
          if (action.data != undefined)
            // this._storeMessages(messages);
            console.log("data in msg sent: ", action.data)
            this._storeMessages([{ _id:action.data._id , createdAt: action.data.createdAt,text: action.data.message,user:{_id: action.data.from}}]);
            this.state.socket.messageSent = action.data.data;
          break;
        }
        case "sendMessage": {
          if (action.data.from === this.state.toUserID) {
            console.log("from case sendmesg", action.data);
            this._storeMessages([{ _id:action.data._id , createdAt: action.data.createdAt,text: action.data.message,user:{_id: action.data.from}}]);
          }
        }
      }
    // });
  }
  getUserChats() {
    const userId = this.state.toUserID;
    //console.log("toUserID in get", userId)
    const data = { toUserId: userId };
    const action = { type: "chat:chat/messages/get", data: data };
    this.state.socket.emit("action", action);
    //this.receiveSockets(this.state.socket);
  }
  async postUserChats(message) {
    const userId = this.state.toUserID;
    //console.log("userid: ", userId);
    const data = {
      toUserId: userId,
      messageInfo: { text: message.text },
    };
    const action = { type: "chat:chat/message/post", data: data };
    this.state.socket.emit("action", action);
  }


  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  async onSend(messages = []) {
    console.log("message", messages);
     await this.postUserChats(messages[0]);
    // console.log("from on send function: ", socket);
    // if (socket.messageSent) {
    //   this._storeMessages(messages);
    // } else {
    //   console.log("error");
    // }
  }

  render() {
    const userId = { _id: this.state.userId || -1 };
    return (
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
          // inverted={false}
        />
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

export default connect(mapStateToProps, null)(ChatConversationScreen);
