import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

interface FileModalProps {
  isFileModalVisible: boolean;
  onClose: () => void;
}

const FileModal: React.FC<FileModalProps> = ({ isFileModalVisible, onClose }) => {
  return (
    <Modal
          animationType="fade"
          transparent={true}
          visible={isFileModalVisible}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Imported data from patient file</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
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
    paddingHorizontal: scale(287),
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
    width: scale(350),
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

export default FileModal;
