import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

interface CutoffValuesModalProps {
  isCutoffValuesModalVisible: boolean;
  onClose: () => void;
}

const CutoffValuesModal: React.FC<CutoffValuesModalProps> = ({ isCutoffValuesModalVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isCutoffValuesModalVisible}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.bigText}>Handgrip Strength Cutoffs:</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tableContainer}>
                <View>
                  <Text style={styles.litteText}>Male:</Text>
                  <View style={styles.flexRow}>
                    <View>
                      <Text style={styles.litteText}>BMI ≤24:</Text>
                      <Text style={styles.litteText}>BMI 24.1-26:</Text>
                      <Text style={styles.litteText}>BMI 26.1-28:</Text>
                      <Text style={styles.litteText}>BMI {'>'}28:</Text>
                    </View>
                    <View>
                      <Text style={[styles.litteText, styles.rightText]}>≤29kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤30kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤30kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤32kg</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.litteText}>Female:</Text>
                  <View style={styles.flexRow}>
                    <View>
                      <Text style={styles.litteText}>BMI ≤23:</Text>
                      <Text style={styles.litteText}>BMI 23.1-26:</Text>
                      <Text style={styles.litteText}>BMI 26.1-29:</Text>
                      <Text style={styles.litteText}>BMI {'>'}29:</Text>
                    </View>
                    <View>
                      <Text style={[styles.litteText, styles.rightText]}>≤17kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤17.3kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤18kg</Text>
                      <Text style={[styles.litteText, styles.rightText]}>≤21kg</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.litteText}>Average three trials from the dominating hand</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


const styles = StyleSheet.create({
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
    width: scale(400),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: scale(200),
    paddingHorizontal: scale(50),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  litteText: {
    fontSize: scale(16),
  },
  rightText: {
    textAlign: 'right',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(10),
  },
  bigText: {
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

export default CutoffValuesModal;
