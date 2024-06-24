import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCompletionStatus, useThresholdStatus, useOverrideStatus } from '@/contexts/CompletionContext';
import { scale } from '@/utils/scaling';
import NoteTakingModal from '../../components/NoteTakingModal';
import Checkbox from '@/components/checkbox';
import AutoNavigationModal from '@/components/AutoNavigtionModal';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { AntDesign } from '@expo/vector-icons';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { thresholdStatus, setThresholdStatus} = useThresholdStatus();
  const { completionStatus, setCompletionStatus, getLastCompletePage } = useCompletionStatus();
  const { overrideStatus, setOverrideStatus } = useOverrideStatus();
  const [isAutoNavigationModalVisible, setIsAutoNavigationModalVisible] = useState(false);
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

const handleUndo = () => {
  setIsAutoNavigationModalVisible(false);
  handleBack();
}

useEffect(() => {
  if (showPopup === 'true') {
    setIsAutoNavigationModalVisible(true);
    const timer = setTimeout(() => setIsAutoNavigationModalVisible(false), 8000); // 5 seconds
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
}
const contents: Content[] = [
  {index: 'cci', header: 'High risk of developing POD', subHeader: 'High risk of developing POD if CCI > 1'},
  {index: 'asa', header: 'High risk of developing POD', subHeader: 'High risk of developing POD if ASA PS III or higher'},
  {index: 'ss', header: 'Low risk of developing POD', subHeader: 'Low risk of developing POD if surgery site is peripheral'},
  {index: 'frailtyhigh', header: 'High risk of developing POD', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail'},
  {index: 'frailtylow', header: 'Low risk of developing POD', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail'},
  {index: 'none', header: 'Risk has not been determined', subHeader: ''},
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
  setOverrideStatus('override', manualLowRisk);
  setOverrideStatus('newValue', !manualLowRisk);
}, [manualLowRisk]);

useEffect(() => {
  setOverrideStatus('override', manualHighRisk);
  setOverrideStatus('newValue', manualHighRisk);
}, [manualHighRisk]);


useEffect(() => {
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
  switch(resultContent){
    case 'cci':{
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
      return(
        <View style={[styles.container, styles.riskContainer]}>
          <View style={styles.flexRow}>
            <Text style={styles.bigText}>The patient is at </Text>
            <Text style={[styles.bigText, styles.veryBold]}>LOW RISK</Text>
            <Text style={styles.bigText}> of developing POD</Text>
          </View>
          <Text style={styles.bigText}>Patients with peripheral surgery develop POD in 10% of cases</Text>
          <Text style={styles.bigText}>Patient is not in need of further screening</Text>
        </View>
      );
    }
    case 'asa':{
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
      return(
        <View style={[styles.container, styles.riskContainer]}>
          <View style={styles.flexRow}>
            <Text style={styles.bigText}>The patient is at </Text>
            <Text style={[styles.bigText, styles.veryBold]}>LOW RISK</Text>
            <Text style={styles.bigText}> of developing POD</Text>
          </View>
          <Text style={styles.bigText}>Patients with who are stable according to the frailty assesment develop POD in 15% of cases</Text>
          <Text style={styles.bigText}>Patient is not in need of further screening</Text>
          </View>
      );
    }
    case 'none':{
      return(
        <View style={[styles.container, styles.riskContainer]}>
          <Text style={styles.bigText}>More information is needed to determine a result.{'\n'}</Text>
            <View style={[styles.overrideContainer, manualLowRisk && styles.selectedContainer]}>
                <Checkbox
                  value={manualLowRisk}
                  onValueChange={() => [setManualLowRisk(!manualLowRisk), manualHighRisk && setManualHighRisk(false)]}
                />
                <Text style={styles.bigText}>Manually set risk to low</Text>
            </View>
            <View style={[styles.overrideContainer, manualHighRisk && styles.selectedContainer]}>
                <Checkbox
                  value={manualHighRisk}
                  onValueChange={() => [setManualHighRisk(!manualHighRisk), manualLowRisk && setManualLowRisk(false)]}
                />
                <Text style={styles.bigText}>Manually set risk to high</Text>
          </View>
        </View>
      );
    }
    default:{
      return(
        <View style={[styles.container, styles.riskContainer]}>
              <Text style={styles.modalText}>Error</Text>
        </View>
      );
    }
  }
};

  return (
      <View style={styles.container}>
        <Header
          mainText={contents.find(item => item.index === resultContent)?.header}
          subText={contents.find(item => item.index === resultContent)?.subHeader}
        />
        <View style={styles.contentContainer}>
          {renderContentBasedOnThreshold()}
          <View style={styles.buttonContainer}>
            {(resultContent === 'ss' || resultContent === 'frailtylow') ? (
              <View style={[styles.overrideContainer, overrideStatus['override'] && styles.selectedContainer]}>
                <Checkbox
                  value={overrideStatus['override']}
                  onValueChange={handleOverride}
                />
                <Text style={styles.bigText}>The Patient is in need of further screening anyway</Text>
              </View>
            ) : (<View></View>)}
            <TouchableOpacity onPress={() => setIsNoteModalVisible(true)} style={styles.notesButton}>
              <Text style={styles.notesButtonText}>Take Notes</Text>
              <AntDesign name="form" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Footer
          nextText='Finish'
          handleBack={handleBack}
          handleNext={handleNext}
        />
        <AutoNavigationModal
          isAutoNavigationModalVisible={isAutoNavigationModalVisible}
          onClose={() => setIsAutoNavigationModalVisible(false)}
          onUndo={handleUndo}
        />
        <NoteTakingModal 
          onClose={() => setIsNoteModalVisible(false)}
          isNoteModalVisible={isNoteModalVisible}
        />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
    justifyContent: 'space-between',
  },
  overrideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    borderWidth: scale(2),
    height: scale(60),
    borderRadius: scale(8),
    paddingHorizontal: scale(25),
  },
  selectedContainer: {
    borderColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(5),
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
  notesButton: {
    height: scale(60),
    width: scale(220),
    borderRadius: scale(8), 
    borderWidth: scale(2),
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    gap: scale(10),
  },
  notesButtonText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  flexRow: {
    flexDirection: 'row',
  },
  riskContainer:{
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: scale(100),
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