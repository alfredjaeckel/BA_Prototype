import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';
import CutoffValuesModal from '@/components/CutoffValuesModal';
import Footer from '@/components/footer';
import Header from '@/components/header';

const FrailtyPage: React.FC = () => {
  const router = useRouter();
  const { setCompletionStatus } = useCompletionStatus();
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
      <Header
        mainText="Please select the patient's frailty status"
        subText="Low risk of developing POD if stable, High risk of developing POD if pre-frail or frail"
      />
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
            <CutoffValuesModal
              isCutoffValuesModalVisible={isCutoffVisible}
              onClose={() => setIsCutoffVisible(false)}
            />
          </View>
        </View>
      </ScrollView>
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
});

export default FrailtyPage;
