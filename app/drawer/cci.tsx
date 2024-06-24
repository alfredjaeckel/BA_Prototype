import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import CciCheckbox from '../../components/CciCheckbox'; 
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
      <ScrollView>
        <View style={styles.checkboxContainer}>
          {conditions.map((condition) => (
            <View key={condition.index}>
                <CciCheckbox
                  name={condition.name}
                  index={condition.index}
                  weight={condition.weight}
                  handleQuestionMarkClick={handleQuestionMarkClick}
                  handleSelectorChange={handleSelectorChange}
                  showInfo={condition.showInfo}
                  info={condition.info}
                  value={condition.value}
                  onValueChange={(newValue) => handleCheckboxChange(condition.index, newValue)}
                />
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
          {/*<Text style={styles.sumText}>Total Weight: {sumConditionValues()}</Text>*/}
        </View>
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
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
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