import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import NoteTakingModal from './NoteTakingModal';
import { scale } from '@/utils/scaling';
import { AntDesign } from '@expo/vector-icons';


/*-----------------------------------

Exit Modal

Opened after tapping exit button, allows the user to leave the assesment, setting an override if they want

------------------------------------*/

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
    <Modal visible={isExitModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Are you shure you want to exit?</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                {/* Take notes button, opens note taking modal */}
                <TouchableOpacity onPress={() => setIsNoteModalVisible(true)} style={styles.notesButton}>
                  <Text style={styles.notesButtonText}>Take Notes</Text>
                  <AntDesign name="form" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.exitButtonContainer}>
                  <TouchableOpacity onPress={setExitLowRisk} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Set risk to low and exit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={setExitHighRisk} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Set risk to high and exit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={setExitUnknownRisk} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Exit</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#FFCCCC',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
    marginVertical: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
  },
  modalButtonText: {
    color: '#FF0000',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(20),
    paddingVertical: scale(20),
    marginHorizontal: scale(20),
  },
  exitButtonContainer: {
  },
  notesButton: {
    height: scale(50),
    width: scale(220),
    borderRadius: scale(8), 
    borderWidth: scale(2),
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    gap: scale(10),
    marginVertical: scale(5),
  },
  notesButtonText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  closeButton: {
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  closeButtonText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});

export default ExitModal;
