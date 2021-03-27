import React from "react";
import { View, Button, SafeAreaView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch } from "react-redux";
import * as authActions from "../actions/action";
import Colors from "../constants/Colors";
const CustomerDetailScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <Button
          title="Abmelden"
          color={Colors.primary}
          onPress={() => {
            dispatch(authActions.logout());
            props.navigation.navigate("Auth");
          }}
        />
      </SafeAreaView>
    </View>
  );
};

CustomerDetailScreen.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Arbeit hinzufügen"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("AddCustomerDetails");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default CustomerDetailScreen;
