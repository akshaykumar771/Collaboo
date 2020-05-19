import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const InventoryScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>InventoryScreen</Text>
        </View>
    );
};

InventoryScreen.navigationOptions = {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="File System"
          iconName="ios-add"
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

export default InventoryScreen;