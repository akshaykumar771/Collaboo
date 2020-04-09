import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const CustomerDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>CustomerDetailScreen</Text>
    </View>
  );
};

CustomerDetailScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add work"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("AddCustomerDetails");
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CustomerDetailScreen;
