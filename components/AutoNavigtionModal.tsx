import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

interface AutoNavigationModalProps {
  isAutoNavigationModalVisible: boolean;
  onClose: () => void;
  onUndo: () => void;
}

const AutoNavigationModal: React.FC<AutoNavigationModalProps> = ({ isAutoNavigationModalVisible, onClose, onUndo }) => {
  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={isAutoNavigationModalVisible}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Threshold met!</Text>
                  <Text style={styles.modalText}>Navigated here automatically.</Text>
                  <Button title="Close" onPress={onClose} />
                  <Button title="Undo" onPress={onUndo} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
  );
};


const styles = StyleSheet.create({
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

export default AutoNavigationModal;
