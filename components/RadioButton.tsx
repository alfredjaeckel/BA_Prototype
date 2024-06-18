import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale } from '@/utils/scaling';

interface RadioButtonProps {
  label: string;
  subtext: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, subtext, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.radioContainer}>
        <MaterialIcons
          name={selected ? "radio-button-checked" : "radio-button-unchecked"}
          size={24}
          color={selected ? "#007AFF" : "#8E8E93"}
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.subtext}>{subtext}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  label: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: scale(16),
  },
});

export default RadioButton;
