import React from 'react';
import { View } from 'react-native';
import RadioButton from './RadioButton';

/*-----------------------------------

Exclusive Radio Buttons Component

Returns a selector with two mutually exclusive options

------------------------------------*/

interface ExclusiveRadioButtonsProps {
  option1Label: string;
  option1Subtext: string;
  option2Label: string;
  option2Subtext: string;
  value: boolean; // false for option 1, true for option 2
  onValueChange: (value: boolean) => void;
}

const ExclusiveRadioButtons: React.FC<ExclusiveRadioButtonsProps> = ({ 
  option1Label, 
  option1Subtext, 
  option2Label, 
  option2Subtext, 
  value,
  onValueChange,
}) => {

  return (
    <View>
      <RadioButton
        label={option1Label}
        subtext={option1Subtext}
        selected={!value}
        onPress={() => onValueChange(!value)}
      />
      <RadioButton
        label={option2Label}
        subtext={option2Subtext}
        selected={value}
        onPress={() => onValueChange(!value)}
      />
    </View>
  );
};

export default ExclusiveRadioButtons;
