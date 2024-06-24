import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <MaterialIcons
        name={value ? "check-box" : "check-box-outline-blank"}
        size={28}
        color={value ? "#0000FF" : "#8E8E93"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Checkbox;
