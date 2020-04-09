import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const ChatScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Chat Screen</Text>
            <Button title="Go to ToDo" onPress={() => {
                props.navigation.navigate({routeName: 'ToDo'});
            }} />
        </View>
    );
};
ChatScreen.navigationOptions = {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() =>{console.log("Added as fav")}}
        />
      </HeaderButtons>
    )
  };
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default ChatScreen;