import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

interface CutoffValuesModalProps {
  isCutoffValuesModalVisible: boolean;
  onClose: () => void;
}

const CutoffValuesModal: React.FC<CutoffValuesModalProps> = ({ isCutoffValuesModalVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCutoffValuesModalVisible}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.bigText}>Handgrip Strength Cutoffs:</Text>
              <View style={styles.flexRow}>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});

export default CutoffValuesModal;
