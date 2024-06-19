type Condition = {
    index: number;
    name: string;
    value: boolean;
    weight: number;
    showInfo: boolean;
    info: string;
  };
  
  export const conditionState: Condition[] = [
    { index: 0,  name: "Myocardial infarction", value: false, weight: 1, showInfo: true, info: "one or more definite or probable myocardial infarctions, had been hospitalised and had EKG and or enzyme changes"},
    { index: 1,  name: "CHF", value: false, weight: 1, showInfo: true, info:'exertional or paroxysmal nocturnal dyspnea and has responded to digitalis, diuretics, or afterload reducing agents' },
    { index: 2,  name: "Peripheral vascular disease", value: false, weight: 1, showInfo: true , info:'Intermittent claudication or past bypass for chronic arterial insufficiency, history of gangrene or acute arterial insufficiency, or untreated thoracic or abdominal aneurysm (≥6 cm)' },
    { index: 3,  name: "CVA or TIA", value: false, weight: 1, showInfo: true , info:'History of a cerebrovascular accident with minor or no residua and transient ischemic attacks' },
    { index: 4,  name: "Dementia", value: false, weight: 1, showInfo: true , info:'Chronic cognitive deficit' },
    { index: 5,  name: "COPD", value: false, weight: 1, showInfo: false , info:'' },
    { index: 6,  name: "Connective tissue disease", value: false, weight: 1, showInfo: false , info:'' },
    { index: 7,  name: "Peptic ulcer disease", value: false, weight: 1, showInfo: true , info:'Any history of treatment for ulcer disease or history of ulcer bleeding' },
    { index: 8,  name: "Liver disease", value: false, weight: 1, showInfo: true , info:'Severe = cirrhosis and portal hypertension with variceal bleeding history, moderate = cirrhosis and portal hypertension but no variceal bleeding history, mild = chronic hepatitis (or cirrhosis without portal hypertension)' },
    { index: 9,  name: "Diabetes mellitus", value: false, weight: 1, showInfo: false , info:'' },
    { index: 10, name: "Hemiplegia", value: false, weight: 2, showInfo: false , info:'' },
    { index: 11, name: "Moderate to severe CKG", value: false, weight: 2, showInfo: true , info:'Severe = on dialysis, status post kidney transplant, uremia, moderate = creatinine >3 mg/dL (0.27 mmol/L)' },
    { index: 12, name: "Solid tumor", value: false, weight: 2, showInfo: false , info:'' },
    { index: 13, name: "Leukemia", value: false, weight: 2, showInfo: false , info:'' },
    { index: 14, name: "Lymphoma", value: false, weight: 2, showInfo: false , info:'' },
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
  