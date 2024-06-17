import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from '../../components/checkbox'; 
import Selector from '../../components/selector'; 
import { conditionState, setConditionWeight, setConditionValue, sumConditionValues } from '../../constants/ccidata';

const CciPage: React.FC = () => {
  const [conditions, setConditions] = useState(conditionState);
  const router = useRouter();

  useEffect(() => {
    setConditions([...conditionState]); // Initialize state with current condition values
  }, []);

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedConditions = conditions.map(condition => {
      if (condition.index === index) {
        return { ...condition, value };
      }
      return condition;
    });
    setConditions(updatedConditions);
    setConditionValue(index, value); // Update the value in the original array
  };

  const handleSelectorChange = (index: number, weight: number) => {
    const updatedConditions = conditions.map(condition => {
      if (condition.index === index) {
        return { ...condition, weight };
      }
      return condition;
    });
    setConditions(updatedConditions);
    setConditionWeight(index, weight); // Update the weight in the original array
  };

  const handleDecision = (userAnswer: boolean) => {
    if (userAnswer) {
      router.push(`/drawer/result?from=cci`);
    } else {
      router.push('/drawer/ss');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {conditions.map((condition) => (
        <View key={condition.index} style={styles.checkboxContainer}>
          <Checkbox
            label=""
            value={condition.value}
            onValueChange={(newValue) => handleCheckboxChange(condition.index, newValue)}
          />
          <Text>{condition.name}</Text>
          {condition.name === 'Liver disease' && (
            <Selector
              weight={condition.weight}
              highWeight={3}
              onWeightChange={(newWeight) => handleSelectorChange(condition.index, newWeight)}
            />
          )}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Yes" onPress={() => handleDecision(true)} />
        <Button title="No" onPress={() => handleDecision(false)} />
      </View>
      <Text style={styles.sumText}>Total Weight: {sumConditionValues(conditions)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  sumText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default CciPage;
