import { scale } from '@/utils/scaling';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

/*-----------------------------------

Modal to show after automatic forewarding

------------------------------------*/

interface AutoNavigationModalProps {
  isAutoNavigationModalVisible: boolean;
  onClose: () => void;
  onUndo: () => void;
}

const AutoNavigationModal: React.FC<AutoNavigationModalProps> = ({ isAutoNavigationModalVisible, onClose, onUndo }) => {
  return (
    <Modal
          animationType="fade"
          transparent={true}
          visible={isAutoNavigationModalVisible}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Threshold met!</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalText}>Navigated here automatically.</Text>
                  {/* Undo button, undoes automatic forewarding*/}
                  <TouchableOpacity onPress={onUndo} style={styles.undoButton}>
                    <Text style={styles.undoButtonText}>Undo</Text>
                    <MaterialCommunityIcons name="undo-variant" size={24} color="red" />
                  </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: scale(100),
    paddingHorizontal: scale(310),
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
    gap: scale(15),
    width: scale(280),
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
    textAlign: "center",
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
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(5),
  },
  undoButtonText: {
    color: '#FF0000',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});

export default AutoNavigationModal;
