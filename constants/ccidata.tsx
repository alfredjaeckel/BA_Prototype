type Condition = {
    index: number;
    name: string;
    value: boolean;
    weight: number;
    showInfo: boolean;
    info: string;
  };
  
  export const conditionState: Condition[] = [
    { index: 0, name: "Myocardial infarction", value: false, weight: 1, showInfo: true, info: "This is a heart attack."},
    { index: 1, name: "Congestive heart failure", value: false, weight: 1, showInfo: false, info:'' },
    { index: 2, name: "Peripheral vascular disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 3, name: "Cerebrovascular disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 4, name: "Dementia", value: false, weight: 1, showInfo: false , info:'' },
    { index: 5, name: "Chronic pulmonary disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 6, name: "Rheumatic disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 7, name: "Peptic ulcer disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 8, name: "Liver disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 9, name: "Diabetes without complications", value: false, weight: 1, showInfo: false , info:'' },
    { index: 10, name: "Diabetes with complications", value: false, weight: 2, showInfo: false , info:'' },
    { index: 11, name: "Hemiplegia or paraplegia", value: false, weight: 2, showInfo: false , info:'' },
    { index: 12, name: "Renal disease", value: false, weight: 2, showInfo: false , info:'' },
    { index: 13, name: "Any malignancy", value: false, weight: 2, showInfo: false , info:'' },
    { index: 14, name: "Metastatic solid tumor", value: false, weight: 6, showInfo: false , info:'' },
    { index: 15, name: "AIDS/HIV", value: false, weight: 6, showInfo: false , info:'' },
  ];
  
  const initSumConditionValues = (conditions: Condition[]): number => {
    console.log('intiSumConditionValues');
    return conditions.reduce((sum, condition) => {
      return condition.value ? sum + condition.weight : sum;
    }, 0);
  }

  let conditionSum: number = initSumConditionValues(conditionState);

  export const setConditionValue = (index: number, value: boolean): void => {
    const condition = conditionState.find(c => c.index === index);
    if (condition) {
      condition.value = value;
      conditionSum = value ? conditionSum + condition.weight : conditionSum - condition.weight;
    }
  };
  
  export const setConditionWeight = (index: number, weight: number): void => {
    const condition = conditionState.find(c => c.index === index);
    if (condition) {
      if (condition.value) {
        conditionSum = conditionSum - condition.weight + weight;
      }
      condition.weight = weight;
    }
  };
  
  export const sumConditionValues = (): number => {
    return conditionSum;
  };
  