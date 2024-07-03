import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';
import Footer from '@/components/footer';
import Header from '@/components/header';

/*-----------------------------------

ASA PS cue page

------------------------------------*/

const ASAPage: React.FC = () => {
  const router = useRouter();
  const { setCompletionStatus, getFirstIncompletePage } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHandleNext, setIsHandleNext] = useState(false);

  //if the page hasn't been visited prior, and the user has interacted with the page, autoforward if threshold is reached.
  useEffect(() => {
    if (!visitedStatus['asa'] && hasInteracted) {
      const timer = setTimeout(() => {
        setCompletionStatus('asa', true);
        setVisitedStatus('asa', true);
        if (thresholdStatus['asa']) {
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
  useEffect(() => {
    if (isHandleNext) {
      if (thresholdStatus['asa']) {
        setVisitedStatus('asa', true);
        router.push('/drawer/result');
      } else {
        setVisitedStatus('asa', true);
        router.push(`/drawer/${getFirstIncompletePage()}`);
      }
    }
  }, [isHandleNext]);

  const handleNext = () => {
    setCompletionStatus('asa', true);
    setIsHandleNext(true);
  };

  //handle pressing the back button
  const handleBack = () => {
    router.push('/drawer/ss');
  };

  //render the page
  return (
    <View style={styles.container}>
      <Header
        mainText="Please select the patient's ASA PS"
        subText="High risk of developing POD if ASA PS III or higher"
      />
      <ScrollView style={styles.checkboxContainer}>
        {/* ASA PS selector*/}
        <ExclusiveRadioButtons
          option1Label="ASA I / II"
          option1Subtext="a patient with at most mild systemic disease"
          option2Label="ASA III / IV / V"
          option2Subtext="a patient with at least moderate systemic disease"
          value={thresholdStatus['asa']} // Pass true for option 2, false for option 1
          onValueChange={(newValue) => {
            setThresholdStatus('asa', newValue); 
            setHasInteracted(true);
          }}
        />
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
});

export default ASAPage;
