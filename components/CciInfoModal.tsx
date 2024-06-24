import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

interface CciInfoModalProps {
  isCciInfoModalVisible: boolean;
  name: string;
  info: string;
  onClose: () => void;
}

const CciInfoModal: React.FC<CciInfoModalProps> = ({ isCciInfoModalVisible, name, info, onClose }) => {
  return (
    <Modal
    visible={isCciInfoModalVisible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{name}</Text>
              <Text style={styles.modalText}>{info}</Text>
              <Button title="Close" onPress={onClose} />
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

export default CciInfoModal;
