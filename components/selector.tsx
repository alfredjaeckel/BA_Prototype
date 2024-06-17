import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SelectorProps = {
  weight: number;
  highWeight: number;
  onWeightChange: (newWeight: number) => void;
};

const Selector: React.FC<SelectorProps> = ({ weight, highWeight, onWeightChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, weight === 1 && styles.selectedOption]}
        onPress={() => onWeightChange(1)}
      >
        <Text style={styles.optionText}>Mild</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, weight > 1 && styles.selectedOption]}
        onPress={() => onWeightChange(highWeight)}
      >
        <Text style={styles.optionText}>Moderate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, 
  },
  option: {
    marginHorizontal: 5,
    padding: 5, 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Selector;
