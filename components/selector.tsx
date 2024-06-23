import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SelectorProps = {
  weight: number;
  highWeight: number;
  minLable: string;
  maxLabel: string;
  onWeightChange: (newWeight: number) => void;
};

const Selector: React.FC<SelectorProps> = ({ weight, highWeight, minLable, maxLabel, onWeightChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, weight === 1 && styles.selectedOption]}
        onPress={() => onWeightChange(1)}
      >
        <Text style={[styles.littleText, weight === 1 && styles.selectedText]}>{minLable}</Text>
        <Text style={[styles.littleText, weight === 1 && styles.selectedText]}> +1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, weight > 1 && styles.selectedOption]}
        onPress={() => onWeightChange(highWeight)}
      >
        <Text style={[styles.littleText, weight > 1 && styles.selectedText]}>{maxLabel}</Text>
        <Text style={[styles.littleText, weight > 1 && styles.selectedText]}> +{highWeight}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    padding: 2,
  },
  option: {
    padding: 6,
    paddingHorizontal: 15, 
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(180),
  },
  selectedOption: {
    backgroundColor: '#FFFFFF',
  },
  selectedText: {
    //color: 'white',
  },
  littleText: {
    fontSize: scale(16),
  },
});

export default Selector;
