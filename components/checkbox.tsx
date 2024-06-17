import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <MaterialIcons
        name={value ? "check-box" : "check-box-outline-blank"}
        size={24}
        color={value ? "#007AFF" : "#8E8E93"}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 18,
  },
});

export default Checkbox;
