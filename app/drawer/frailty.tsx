import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight, scaleWidth } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';

const FrailtyPage: React.FC = () => {
  const router = useRouter();
  const { completionStatus, setCompletionStatus } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCutoffVisible, setIsCutoffVisible] = useState(false);

  useEffect(() => {
    if (!visitedStatus['frailty'] && hasInteracted) {
      const timer = setTimeout(() => {
        setCompletionStatus('frailty', true);
        setVisitedStatus('frailty', true);
        if (thresholdStatus['frailty']) {
          router.push({
            pathname: '/drawer/result',
            params: { showPopup: 'true' }
          });
        }
      }, 1000); // 1 second delay
      return () => clearTimeout(timer);
    }
  }, [thresholdStatus]);


  const handleNext = () => {
    setCompletionStatus('frailty', true);
    setVisitedStatus('frailty', true);
    router.push('/drawer/result');
  };

  const handleBack = () => {
    router.push('/drawer/asa');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>Please select the patients frailty status</Text>
        <Text style={[styles.litteText, styles.rightText]}>{"Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail"}</Text>
      </View>
      <ScrollView style={styles.checkboxContainer}>
        <ExclusiveRadioButtons
          option1Label="Stable"
          option1Subtext="patient exhibits non of the frailty criteria"
          option2Label="Frail or pre-frail"
          option2Subtext="patient exhibits one or more of the frailty criteria"
          value={thresholdStatus['frailty']} // Pass true for option 2, false for option 1
          onValueChange={(newValue) => {
            setThresholdStatus('frailty', newValue); 
            setHasInteracted(true);
          }}
        />
        <View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteBoldText}>Fried Frailty Criteria</Text>
          </View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteText}>Exaustion</Text>
            <Text style={[styles.litteText, styles.rightText]}>self-reported</Text>
          </View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteText}>Weightloss</Text>
            <Text style={[styles.litteText, styles.rightText]}>{'>'}3kg in the past 3 months</Text>
          </View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteText}>Low Physical Activity</Text>
            <Text style={[styles.litteText, styles.rightText]}>Patient can{'\''}t transfer from bed to chair without at least minor help (verbal or physical)</Text>
          </View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteText}>Impairment of Gait Speed</Text>
            <Text style={[styles.litteText, styles.rightText]}>slowness in Timed-Up and Go test (≥ 10seconds)</Text>
          </View>
          <View style={styles.frailtyCriterion}>
            <Text style={styles.litteText}>Muscle Weakness</Text>
            <View style={styles.flexRow}> 
              <Text style={[styles.litteText, styles.rightText]}>Hand Grip Strength</Text>
              <Text>    </Text>
              <TouchableOpacity onPress={() => setIsCutoffVisible(true)}>
                <Text style={styles.litteText}>Show Cutoffs</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCutoffVisible}
            >
              <TouchableWithoutFeedback onPress={() => setIsCutoffVisible(false)}>
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
                      <Button title="Close" onPress={() => setIsCutoffVisible(false)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleNext}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderBottomWidth: 1,
    height: scaleHeight(80),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderTopWidth: 1,
    height: scale(80),
  },
  frailtyCriterion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  litteBoldText: {
    fontSize: scale(16),
    fontWeight: 'bold',
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
  nextButton: {
    backgroundColor: '#0000FF', 
    height: scale(60),
    width: scale(220),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#CCCCFF', 
    height: scale(60),
    width: scale(220),
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  backButtonText: {
    color: 'blue',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
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
});

export default FrailtyPage;
