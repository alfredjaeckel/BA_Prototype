import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from '../../components/checkbox'; 
import Selector from '../../components/selector'; 
import { conditionState, setConditionWeight, setConditionValue, sumConditionValues } from '../../constants/ccidata';
import { scale } from '../../utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '../../contexts/CompletionContext'; 

const CciPage: React.FC = () => {
  const [conditions, setConditions] = useState(conditionState);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({ name: '', info: '' });
  const router = useRouter();
  const { setCompletionStatus } = useCompletionStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();

  useEffect(() => {
    setConditions([...conditionState]);
  }, []);

  useEffect(() => {
    const sum = sumConditionValues();
    if (thresholdStatus['cci'] !== (sum > 1)) {
      setThresholdStatus('cci', sum > 1);
    }
  }, [conditions, setThresholdStatus]);

  useEffect(() => {
    if (!visitedStatus['cci'] && hasInteracted) {
      const timer = setTimeout(() => {
        setCompletionStatus('cci', true);
        setVisitedStatus('cci', true);
        if (thresholdStatus['cci']) {
          router.push({
            pathname: '/drawer/result',
            params: { showPopup: 'true' }
          });
        }
      }, 1000); // 1 second delay
      return () => clearTimeout(timer);
    }
  }, [thresholdStatus]);
  

  const handleCheckboxChange = useCallback((index: number, value: boolean) => {
    setHasInteracted(true);
    const updatedConditions = conditions.map(condition => condition.index === index ? { ...condition, value } : condition);
    setConditions(updatedConditions);
    setConditionValue(index, value);
  }, [conditions]);
  
  const handleSelectorChange = useCallback((index: number, weight: number) => {
    setHasInteracted(true);
    const updatedConditions = conditions.map(condition => condition.index === index ? { ...condition, weight } : condition);
    setConditions(updatedConditions);
    setConditionWeight(index, weight);
  }, [conditions]);
  

  const handleQuestionMarkClick = (name: string, info: string) => {
    setPopupContent({ name, info });
    setIsPopupVisible(true);
  };

  const handleNext = () => {
    setCompletionStatus('cci', true);
    if (thresholdStatus['cci']) {
      setVisitedStatus('cci', true);
      router.push('/drawer/result');
    } else {
      setVisitedStatus('cci', true);
      router.push('/drawer/ss');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>Please select the patients conditions</Text>
        <Text style={styles.litteText}>High risk of developing POD if CCI {'>'} 1</Text>
      </View>
      <ScrollView style={styles.container}>
        {conditions.map((condition) => (
          <View key={condition.index} style={styles.checkboxContainer}>
            <View style={styles.checkboxStart}>
              <Checkbox
                label=""
                value={condition.value}
                onValueChange={(newValue) => handleCheckboxChange(condition.index, newValue)}
              />
              <Text style={styles.bigText}>{condition.name}</Text>
              {condition.name === 'Liver disease' && (
                <Selector
                  weight={condition.weight}
                  highWeight={3}
                  minLable='Mild'
                  maxLabel='Moderate to Severe'
                  onWeightChange={(newWeight) => handleSelectorChange(condition.index, newWeight)}
                />
              )}
              {condition.name === 'Diabetes mellitus' && (
                <Selector
                  weight={condition.weight}
                  highWeight={2}
                  minLable='Uncomplicated'
                  maxLabel='End organ damage'
                  onWeightChange={(newWeight) => handleSelectorChange(condition.index, newWeight)}
                />
              )}
            </View>
            <View style={styles.checkboxEnd}>
              <Text> +{condition.weight}</Text>
              {condition.showInfo && (
                <TouchableOpacity 
                  onPress={() => handleQuestionMarkClick(condition.name, condition.info)}
                  style={styles.questionMark}
                >
                  <Text>?</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPopupVisible}
        >
          <TouchableWithoutFeedback onPress={() => setIsPopupVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>{popupContent.name}</Text>
                  <Text style={styles.modalText}>{popupContent.info}</Text>
                  <Button title="Close" onPress={() => setIsPopupVisible(false)} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Text style={styles.sumText}>Total Weight: {sumConditionValues()}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={handleNext}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderBottomWidth: 1,
    height: scale(80),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderTopWidth: 1,
    height: scale(80),
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  litteText: {
    fontSize: scale(16),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
    margin: scale(5),
  },
  checkboxStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(100),
  },
  sumText: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  questionMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: '#0000FF',
    height: scale(60),
    width: scale(220),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});

export default CciPage;