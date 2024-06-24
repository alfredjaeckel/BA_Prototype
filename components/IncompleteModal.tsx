import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

interface IncompleteModalProps {
  isIncompleteModalVisible: boolean;
  onClose: () => void;
}

const IncompleteModal: React.FC<IncompleteModalProps> = ({ isIncompleteModalVisible, onClose}) => {
  return (
    <Modal 
    visible={isIncompleteModalVisible} 
    animationType="slide" 
    transparent
    >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Please complete the other pages first.</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  );
};


const styles = StyleSheet.create({
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
});

export default IncompleteModal;
