import { useState } from 'react';
import initialConditions from '@/assets/conditions.json';

/*-----------------------------------

CCI Data

Stores the conditions and their weights, and value for the Charlson Comorbidity Index

------------------------------------*/

type Condition = {
  index: number;
  name: string;
  value: boolean;
  weight: number;
  showInfo: boolean;
  info: string;
};
//initialize conditions from confitions.json
const useConditions = () => {
  const [conditionState, setConditionState] = useState<Condition[]>(initialConditions);

  // Initialize the sum of condition values
  const initSumConditionValues = (conditions: Condition[]): number => {
    return conditions.reduce((sum, condition) => {
      return condition.value ? sum + condition.weight : sum;
    }, 0);
  };

  let conditionSum: number = initSumConditionValues(conditionState);

  //set condition value if it is checked
  const setConditionValue = (index: number, value: boolean): void => {
    setConditionState(prevState => {
      const condition = prevState.find(c => c.index === index);
      if (condition) {
        condition.value = value;
        conditionSum = value ? conditionSum + condition.weight : conditionSum - condition.weight;
      }
      return [...prevState];
    });
  };

  //update contion weight when severity selector is used
  const setConditionWeight = (index: number, weight: number): void => {
    setConditionState(prevState => {
      const condition = prevState.find(c => c.index === index);
      if (condition) {
        if (condition.value) {
          conditionSum = conditionSum - condition.weight + weight;
        }
        condition.weight = weight;
      }
      return [...prevState];
    });
  };

  const sumConditionValues = (): number => {
    return conditionSum;
  };

  return {
    conditionState,
    setConditionValue,
    setConditionWeight,
    sumConditionValues
  };
};

export default useConditions;
