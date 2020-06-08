import React from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../actions/action';
const WorkLogScreen = props => {
  const dispatch = useDispatch();
    return(
      <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <Button
          title="Logout"
          color={Colors.primary}
          onPress={() => {
             dispatch(authActions.logout());
             props.navigation.navigate('Auth');
          }}
        />
      </SafeAreaView>
    </View>
    );
};

WorkLogScreen.navigationOptions = {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add work"
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

export default WorkLogScreen;