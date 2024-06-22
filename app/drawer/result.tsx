import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCompletionStatus, useThresholdStatus, useOverrideStatus } from '@/contexts/CompletionContext';
import { scale } from '@/utils/scaling';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import NoteTakingModal from './NoteTakingModal';
import Checkbox from '@/components/checkbox';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { thresholdStatus, setThresholdStatus} = useThresholdStatus();
  const { completionStatus, setCompletionStatus, getLastCompletePage } = useCompletionStatus();
  const { overrideStatus, setOverrideStatus } = useOverrideStatus();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNoteModalVisible, setIsNoteModalVisible] = React.useState(false);
  const { showPopup } = useLocalSearchParams();
  const [overrideHighRisk, setOverrideHighRisk] = useState(false);
  const [resultContent, setResultContent] = useState('');
  const [manualLowRisk, setManualLowRisk] = React.useState(false);
  const [manualHighRisk, setManualHighRisk] = React.useState(false);


const handleNext = () => {
  setCompletionStatus('result', true);
  router.push('/startpage');
};

const handleBack = () => {
  const lastCompletePage = getLastCompletePage();
  router.push(`/drawer/${lastCompletePage}`);
};

useEffect(() => {
  if (showPopup === 'true') {
    setIsPopupVisible(true);
    const timer = setTimeout(() => setIsPopupVisible(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }
}, [showPopup]);

useEffect(() => {
  setOverrideHighRisk(overrideStatus['override'] && overrideStatus['newValue']);
}, [])

interface Content {
  index: string;
  header: string;
  subHeader: string;
  back: string;
}
const contents: Content[] = [
  {index: 'cci', header: 'Please select the patients conditions', subHeader: 'High risk of developing POD if CCI > 1', back: '/drawer/cci'},
  {index: 'asa', header: 'Please select the patient\'s ASA PS', subHeader: 'High risk of developing POD if ASA PS III or higher', back: '/drawer/asa'},
  {index: 'ss', header: 'Please select the patient\'s surgery site', subHeader: 'Low risk of developing POD if surgery site is peripheral', back: '/drawer/ss'},
  {index: 'frailtyhigh', header: 'Please select the patients frailty status', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail', back: '/drawer/frailty'},
  {index: 'frailtylow', header: 'Please select the patients frailty status', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail', back: '/drawer/frailty'},
];

useEffect(() => {
  if (thresholdStatus['cci']) {
    setThresholdStatus('result', true);
  } else if (thresholdStatus['ss']) {
    setThresholdStatus('result', false);
  } else if (thresholdStatus['asa']) {
    setThresholdStatus('result', true);
  } else if (thresholdStatus['frailty']) {
    setThresholdStatus('result', true);
  } else {
    setThresholdStatus('result', false);
  }
}, []);

useEffect(() => {
  setOverrideStatus('override', overrideHighRisk);
  setOverrideStatus('newValue', overrideHighRisk);
}, [overrideHighRisk])

useEffect(() => {
  if(manualLowRisk){
    setOverrideStatus('override', true);
    setOverrideStatus('newValue', false);
    router.push('startpage');
  }
}, [manualLowRisk]);

useEffect(() => {
  if(manualHighRisk){
    setOverrideStatus('override', true);
    setOverrideStatus('newValue', true);
    router.push('startpage');
  }
}, [manualHighRisk]);


useEffect(() => {
  console.log('set result')
  if (thresholdStatus['cci'] && completionStatus['cci']) {
    setResultContent('cci');
  } else if (thresholdStatus['ss'] && completionStatus['cci']&& completionStatus['ss']) {
    setResultContent('ss');
  } else if (thresholdStatus['asa'] && completionStatus['cci'] && completionStatus['ss'] && completionStatus['asa']) {
    setResultContent('asa');
  } else if (thresholdStatus['frailty'] && completionStatus['cci'] && completionStatus['ss'] && completionStatus['asa'] && completionStatus['frailty']) {
    setResultContent('frailtyhigh');
  } else if (!thresholdStatus['frailty'] && completionStatus['cci'] && completionStatus['ss'] && completionStatus['asa'] && completionStatus['frailty']){
    setResultContent('frailtylow');
  } else {
    setResultContent('none')
  }
}, []);

const handleOverride = () => {
  setOverrideHighRisk(!overrideHighRisk)
};


const renderContentBasedOnThreshold = () => {
  console.log('set render content')
  console.log(resultContent)
  switch(resultContent){
    case 'cci':{
      console.log('set render cci')
      return(
      <View style={[styles.container, styles.riskContainer]}>
        <View style={styles.flexRow}>
          <Text style={styles.bigText}>The patient is at </Text>
          <Text style={[styles.bigText, styles.veryBold]}>HIGH RISK</Text>
          <Text style={styles.bigText}> of developing POD</Text>
        </View>
        <Text style={styles.bigText}>Patients with a CCI {'>'} 1 develop POD in 35% of cases</Text>
        <Text style={styles.bigText}>Patient is in need of further screening</Text>
      </View>
      );
    } 
    case 'ss':{
      console.log('set render ss')
      return(
        <View>
          <View style={[styles.container, styles.riskContainer]}>
            <View style={styles.flexRow}>
              <Text style={styles.bigText}>The patient is at </Text>
              <Text style={[styles.bigText, styles.veryBold]}>LOW RISK</Text>
              <Text style={styles.bigText}> of developing POD</Text>
            </View>
            <Text style={styles.bigText}>Patients with peripheral surgery develop POD in 10% of cases</Text>
            <Text style={styles.bigText}>Patient is not in need of further screening</Text>
          </View>
            <View style={styles.flexRow}>
            <Checkbox
              label=""
              value={overrideStatus['override']}
              onValueChange={handleOverride}
            />
            <Text style={styles.bigText}>The Patient is in need of further screening anyway</Text>
          </View>
        </View>
      );
    }
    case 'asa':{
      console.log('set render asa')
      return(
        <View style={[styles.container, styles.riskContainer]}>
          <View style={styles.flexRow}>
            <Text style={styles.bigText}>The patient is at </Text>
            <Text style={[styles.bigText, styles.veryBold]}>HIGH RISK</Text>
            <Text style={styles.bigText}> of developing POD</Text>
          </View>
          <Text style={styles.bigText}>Patients with ASA PS III / IV / V develop POD in 30% of cases</Text>
          <Text style={styles.bigText}>Patient is in need of further screening</Text>
        </View>
      );
    }
    case 'frailtyhigh':{
      console.log('set render frailty')
      return(
        <View style={[styles.container, styles.riskContainer]}>
          <View style={styles.flexRow}>
            <Text style={styles.bigText}>The patient is at </Text>
            <Text style={[styles.bigText, styles.veryBold]}>HIGH RISK</Text>
            <Text style={styles.bigText}> of developing POD</Text>
          </View>
          <Text style={styles.bigText}>Patients with who are frail or pre-frail develop POD in 33% of cases</Text>
          <Text style={styles.bigText}>Patient is in need of further screening</Text>
        </View>
      );
    }
    case 'frailtylow':{
      console.log('set render frailty low')
      return(
        <View style={styles.containerWithOverride}>
          <View style={[styles.container, styles.riskContainer]}>
            <View style={styles.flexRow}>
              <Text style={styles.bigText}>The patient is at </Text>
              <Text style={[styles.bigText, styles.veryBold]}>LOW RISK</Text>
              <Text style={styles.bigText}> of developing POD</Text>
            </View>
            <Text style={styles.bigText}>Patients with who are stable according to the frailty assesment develop POD in 15% of cases</Text>
            <Text style={styles.bigText}>Patient is not in need of further screening</Text>
            </View>
            <View style={styles.flexRow}>
              <Checkbox
                label=""
                value={overrideStatus['override']}
                onValueChange={handleOverride}
              />
              <Text style={styles.bigText}>The Patient is in need of further screening anyway</Text>
            </View>
          </View>
      );
    }
    case 'none':{
      console.log('set render none')
      return(
        <View style={[styles.container, styles.riskContainer]}>
              <Text style={styles.modalText}>No Result has been determined, would you like to manually select the result?</Text>
              <View style={styles.exitButtonContainer}>
                <TouchableOpacity onPress={() => [setManualLowRisk(true)]} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setManualHighRisk(true)]} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to high</Text>
                </TouchableOpacity>
          </View>
        </View>
      );
    }
    default:{
      console.log('set render default')
      return(
        <View style={[styles.container, styles.riskContainer]}>
              <Text style={styles.modalText}>No Result has been determined, would you like to manually select the result?</Text>
              <View style={styles.exitButtonContainer}>
                <TouchableOpacity onPress={() => [setManualLowRisk(true)]} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setManualHighRisk(true)]} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to high</Text>
                </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bigText}>{contents.find(item => item.index === resultContent)?.header}</Text>
          <Text style={styles.litteText}>{contents.find(item => item.index === resultContent)?.subHeader}</Text>
        </View>
        <ScrollView style={styles.container}>
          {renderContentBasedOnThreshold()}
        </ScrollView>
        <TouchableOpacity onPress={() => setIsNoteModalVisible(true)} style={styles.notesButton}>
          <Text style={styles.notesButtonText}>Take Notes</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={handleBack}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleNext}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPopupVisible}
        >
          <TouchableWithoutFeedback onPress={() => setIsPopupVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Threshold met!</Text>
                  <Text style={styles.modalText}>Navigated here automatically.</Text>
                  <Button title="Close" onPress={() => setIsPopupVisible(false)} />
                  <Button title="Undo" onPress={() => handleBack()} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
        visible={isNoteModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsNoteModalVisible(false)}
        >
          <NoteTakingModal onClose={() => setIsNoteModalVisible(false)} />
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWithOverride: {
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderTopWidth: 1,
    height: scale(80),
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  veryBold: {
    fontWeight: '900',
  },
  litteText: {
    fontSize: scale(16),
    textAlign: 'right',
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
  notesButton: {
    backgroundColor: '#0000FF', 
    height: scale(60),
    width: scale(220),
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  notesButtonText: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#CCCCFF', 
    height: scale(60),
    width: scale(220),
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  backButtonText: {
    color: 'blue',
    fontSize: scale(20),
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
  flexRow: {
    flexDirection: 'row',
  },
  riskContainer:{
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
    marginVertical: scale(5),
  },
  modalButtonText: {
    color: 'white',
    fontSize: scale(16),
  },
  exitButtonContainer: {
    padding: scale(20),
  },
});

export default ResultPage;