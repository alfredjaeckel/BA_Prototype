import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Selector from './selector';
import { scale } from '@/utils/scaling';
import Checkbox from './checkbox';

interface CciCheckboxProps {
  index: number;
  name: string;
  weight: number;
  value: boolean;
  showInfo: boolean;
  info: string;
  onValueChange: (value: boolean) => void;
  handleSelectorChange: (index: number, weight: number) => void;
  handleQuestionMarkClick: (name: string, info: string) => void;
}

const CciCheckbox: React.FC<CciCheckboxProps> = ({ index, name, weight, value, showInfo, info, onValueChange, handleSelectorChange, handleQuestionMarkClick }) => {
  return (
    <TouchableOpacity
    onPress={() => onValueChange(!value)}
    >
    <View style={[styles.checkboxFrame, value && styles.highlightFrame]}>
      <View style={styles.checkboxStart}>
        <Checkbox value={value} onValueChange={onValueChange} />
        <Text style={styles.bigText}>{name}</Text>
        
      </View>
      <View style={styles.checkboxEnd}>
        {name === 'Liver disease' && (
          <Selector
            weight={weight}
            highWeight={3}
            minLable='Mild'
            maxLabel='Moderate to Severe'
            onWeightChange={(newWeight) => handleSelectorChange(index, newWeight)}
          />
        )}
        {name === 'Diabetes mellitus' && (
          <Selector
            weight={weight}
            highWeight={2}
            minLable='Uncomplicated'
            maxLabel='End organ damage'
            onWeightChange={(newWeight) => handleSelectorChange(index, newWeight)}
          />
        )}
        {name !== 'Liver disease' && name !== 'Diabetes mellitus' && (
          <Text style={[styles.littleText, styles.weightText]}> +{weight}</Text>
        )}
        {showInfo && (
          <TouchableOpacity 
            onPress={() => handleQuestionMarkClick(name, info)}
            style={styles.questionMark}
          >
            <Text style={styles.littleBoldText} >?</Text>
          </TouchableOpacity>
        )}
        {!showInfo && (
          <View style={styles.questionMarkSpacer}></View>
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
    margin: scale(5),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
  },
  highlightFrame: {
    borderColor: '#0000FF',
  },
  checkboxStart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(25),
  },
  checkboxEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  littleBoldText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  littleText: {
    fontSize: scale(16),
  },
  weightText: {
    paddingHorizontal: 8,
  },
  questionMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  questionMarkSpacer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: 2,
  },
});

export default CciCheckbox;
