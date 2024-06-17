type Condition = {
    index: number;
    name: string;
    value: boolean;
    weight: number;
  };
  
  export const conditionState: Condition[] = [
    { index: 0, name: "Myocardial infarction", value: false, weight: 1 },
    { index: 1, name: "Congestive heart failure", value: false, weight: 1 },
    { index: 2, name: "Peripheral vascular disease", value: false, weight: 1 },
    { index: 3, name: "Cerebrovascular disease", value: false, weight: 1 },
    { index: 4, name: "Dementia", value: false, weight: 1 },
    { index: 5, name: "Chronic pulmonary disease", value: false, weight: 1 },
    { index: 6, name: "Rheumatic disease", value: false, weight: 1 },
    { index: 7, name: "Peptic ulcer disease", value: false, weight: 1 },
    { index: 8, name: "Liver disease", value: false, weight: 1},
    { index: 9, name: "Diabetes without complications", value: false, weight: 1 },
    { index: 10, name: "Diabetes with complications", value: false, weight: 2 },
    { index: 11, name: "Hemiplegia or paraplegia", value: false, weight: 2 },
    { index: 12, name: "Renal disease", value: false, weight: 2 },
    { index: 13, name: "Any malignancy", value: false, weight: 2 },
    { index: 14, name: "Metastatic solid tumor", value: false, weight: 6 },
    { index: 15, name: "AIDS/HIV", value: false, weight: 6 },
  ];
  
  export const setConditionValue = (index: number, value: boolean): void => {
    const condition = conditionState.find(c => c.index === index);
    if (condition) {
      condition.value = value;
    }
  };
  
  export const setConditionWeight = (index: number, weight: number): void => {
    const condition = conditionState.find(c => c.index === index);
    if (condition) {
      condition.weight = weight;
    }
  };
  
  export const sumConditionValues = (conditions: Condition[]): number => {
    return conditions.reduce((sum, condition) => {
      return condition.value ? sum + condition.weight : sum;
    }, 0);
  }
  
  