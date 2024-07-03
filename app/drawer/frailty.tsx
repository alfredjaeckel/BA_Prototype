import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';
import CutoffValuesModal from '@/components/CutoffValuesModal';
import Footer from '@/components/footer';
import Header from '@/components/header';

/*-----------------------------------

Frailty cue page

------------------------------------*/

const FrailtyPage: React.FC = () => {
  const router = useRouter();
  const { setCompletionStatus } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCutoffVisible, setIsCutoffVisible] = useState(false);

  //if the page hasn't been visited prior, and the user has interacted with the page, autoforward if threshold is reached.
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

  //handle pressing the next button
  const handleNext = () => {
    setCompletionStatus('frailty', true);
    setVisitedStatus('frailty', true);
    router.push('/drawer/result');
  };

  //handle pressing the back button
  const handleBack = () => {
    router.push('/drawer/asa');
  };

  //render the page
  return (
    <View style={styles.container}>
      <Header
        mainText="Please select the patient's frailty status"
        subText={"Low risk of developing POD if stable\n High risk of developing POD if pre-frail or frail"}
      />
      <View style={styles.checkboxContainer}>
        {/* Frailty selector*/}
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
        {/* Frailty Criteria*/}
        <View style={styles.criterionContainer}>
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
              <TouchableOpacity onPress={() => setIsCutoffVisible(true)} style={styles.cutoffButton}>
                <Text style={styles.litteText}>Cutoff Values</Text>
                <Text style={styles.questionMark} >?</Text>
              </TouchableOpacity>
            </View>
            <CutoffValuesModal
              isCutoffValuesModalVisible={isCutoffVisible}
              onClose={() => setIsCutoffVisible(false)}
            />
          </View>
        </View>
      </View>
      <Footer
        handleBack={handleBack}
        handleNext={handleNext}
      />
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
    flex: 1,
  },
  criterionContainer: {
    paddingTop: scale(50),
    gap: scale(10),
  },
  frailtyCriterion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    height: scale(30),
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
    alignItems: 'center',
  },
  cutoffButton: {
    borderWidth: scale(2),
    borderRadius: scale(8),
    padding: scale(2),
    paddingHorizontal: scale(5),
    flexDirection: 'row',
    gap: scale(5),
    alignItems: 'center',
  },
  questionMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default FrailtyPage;
