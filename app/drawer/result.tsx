import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThresholdStatus } from '@/contexts/CompletionContext';
import { scale } from '@/utils/scaling';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import NoteTakingModal from './NoteTakingModal';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { thresholdStatus } = useThresholdStatus();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNoteModalVisible, setIsNoteModalVisible] = React.useState(false);
  const { showPopup } = useLocalSearchParams();

const handleNext = () => {
  //router.push('/drawer/asa');
};

const handleBack = () => {
  router.back();
};

useEffect(() => {
  if (showPopup === 'true') {
    setIsPopupVisible(true);
    const timer = setTimeout(() => setIsPopupVisible(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }
}, [showPopup]);

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

const result = (): string => {
  if (thresholdStatus['cci']) {
    return 'cci'
  } 
  else if (thresholdStatus['ss']) {
    console.log('renderss');
    return 'ss';
  }
  else if (thresholdStatus['asa']) {
    return 'asa';
  }
  else if (thresholdStatus['frailty']) {
    return 'frailtyhigh';
  }
  else {
    return 'frailtylow';
  }
}

const renderContentBasedOnThreshold = () => {
  // Example logic: render different content if ASA PS is III or higher
  if (thresholdStatus['cci']) {
    return <Text style={styles.bigText}>High risk CCI</Text>;
  } 
  else if (thresholdStatus['ss']) {
    return <Text style={styles.bigText}>Low risk based on SS.</Text>;
  }
  else if (thresholdStatus['asa']) {
    return <Text style={styles.bigText}>High risk based on ASA PS.</Text>;
  }
  else if (thresholdStatus['frailty']) {
    return <Text style={styles.bigText}>High risk based on Frailty.</Text>;
  }
  else {
    return <Text style={styles.bigText}>Low risk based on Frailty.</Text>;
  }
};

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bigText}>{contents.find(item => item.index === result())?.header}</Text>
          <Text style={styles.litteText}>{contents.find(item => item.index === result())?.subHeader}</Text>
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
});

export default ResultPage;