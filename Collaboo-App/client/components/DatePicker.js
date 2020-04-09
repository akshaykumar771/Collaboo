import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
 
const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
 
  return (
    <View>
      <Button title="Choose Date" onPress={showDatePicker} />
      <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        customStyles={{
        datePicker: {
            backgroundColor: 'black'
    }
  }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

})
 
export default DatePicker;