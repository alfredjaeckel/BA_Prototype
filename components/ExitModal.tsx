import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import NoteTakingModal from './NoteTakingModal';
import { scale } from '@/utils/scaling';

interface ExitModalProps {
  isExitModalVisible: boolean;
  onClose: () => void;
  setExitLowRisk: () => void;
  setExitHighRisk: () => void;
  setExitUnknownRisk: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isExitModalVisible, onClose, setExitHighRisk, setExitLowRisk, setExitUnknownRisk }) => {
  const [isNoteModalVisible, setIsNoteModalVisible] = React.useState(false);

  return (
    <Modal visible={isExitModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you shure you want to exit?</Text>
              <View style={styles.exitButtonContainer}>
                <TouchableOpacity onPress={setExitLowRisk} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setExitHighRisk} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit and set risk to high</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setExitUnknownRisk} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Exit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => [setIsNoteModalVisible(true), console.log('press')]} style={styles.notesButton}>
                <Text style={styles.notesButtonText}>Take Notes</Text>
              </TouchableOpacity>
              <NoteTakingModal
                onClose={() => setIsNoteModalVisible(false)}
                isNoteModalVisible={isNoteModalVisible}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: scale(20),
    borderRadius: scale(10),
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: scale(18),
    marginBottom: scale(20),
    textAlign: 'center',
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
});

export default ExitModal;
