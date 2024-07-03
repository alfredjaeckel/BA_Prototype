import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale } from '@/utils/scaling';

/*-----------------------------------

Individual Radio Button Component

Use for one of the mutually exclusive options in ExclusiveRadioButtons

------------------------------------*/

interface RadioButtonProps {
  label: string;
  subtext: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, subtext, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.radioContainer, selected && styles.highlightContainer]}>
        <MaterialIcons
          name={selected ? "radio-button-checked" : "radio-button-unchecked"}
          size={28}
          color={selected ? "#0000FF" : "#8E8E93"}
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(25),
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
    margin: scale(5),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
  },
  highlightContainer: {
    borderColor: '#0000FF',
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
