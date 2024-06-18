import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from '../../components/checkbox'; 
import Selector from '../../components/selector'; 
import { conditionState, setConditionWeight, setConditionValue, sumConditionValues } from '../../constants/ccidata';
import { scale } from '../../utils/scaling';
import { useCompletionStatus } from '../../contexts/CompletionContext'; 

const CciPage: React.FC = () => {
  const [conditions, setConditions] = useState(conditionState);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({ name: '', info: '' });
  const router = useRouter();
  const { setCompletionStatus } = useCompletionStatus();

  useEffect(() => {
    setConditions([...conditionState]);
  }, []);

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedConditions = conditions.map(condition => condition.index === index ? { ...condition, value } : condition);
    setConditions(updatedConditions);
    setConditionValue(index, value);
  };

  const handleSelectorChange = (index: number, weight: number) => {
    const updatedConditions = conditions.map(condition => condition.index === index ? { ...condition, weight } : condition);
    setConditions(updatedConditions);
    setConditionWeight(index, weight);
  };

  const handleQuestionMarkClick = (name: string, info: string) => {
    setPopupContent({ name, info });
    setIsPopupVisible(true);
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
        <Text style={styles.sumText}>Total Weight: {sumConditionValues(conditions)}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {setCompletionStatus('cci', true); router.push('/drawer/ss');}} 
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