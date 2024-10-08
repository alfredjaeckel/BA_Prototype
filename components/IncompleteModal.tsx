import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

/*-----------------------------------

Incomplete Modal

Openes to inform user they can not click on a certain cue in the sidebar, if its not its turn yet.

------------------------------------*/

interface IncompleteModalProps {
  isIncompleteModalVisible: boolean;
  onClose: () => void;
}

const IncompleteModal: React.FC<IncompleteModalProps> = ({ isIncompleteModalVisible, onClose}) => {
  return (
    <Modal 
    visible={isIncompleteModalVisible} 
    animationType="fade" 
    transparent
    >
    <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Not Allowed</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>Please complete the other pages first.</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
  </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: scale(8),
    padding: scale(15),
    paddingHorizontal: scale(25),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: scale(10),
    width: scale(320),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: scale(16),
    width: '100%',
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

export default IncompleteModal;
