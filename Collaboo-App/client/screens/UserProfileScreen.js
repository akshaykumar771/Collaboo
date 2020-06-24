import React from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../actions/action';
const UserProfileScreen = props =>{
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
}
export default UserProfileScreen;