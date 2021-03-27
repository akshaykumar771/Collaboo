import React from "react";
import {Platform, StyleSheet, View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';

const EmployeePicker = () => {
    return (
        <View>
        <Text>Wählen Sie den Mitarbeiter</Text>
        <RNPickerSelect
            placeholder={{
                label:"Wählen Sie den Mitarbeiter",
                color:Colors.primary
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Done', value: 'Done' },
                { label: 'Zu Erledigen', value: 'Zu Erledigen' },
            ]}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Ionicons name={Platform.OS === 'android' ? 'md-arrow-dropdown' : 'ios-arrow-down'} size={24} color={Colors.primary} />;
            }}
        />
        </View>
    );
};
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
})

export default EmployeePicker;