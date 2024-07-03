import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';
import Footer from '@/components/footer';
import Header from '@/components/header';


/*-----------------------------------

Surgery Site cue page

------------------------------------*/

const SSPage: React.FC = () => {
  const router = useRouter();
  const { setCompletionStatus, getFirstIncompletePage } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHandleNext, setIsHandleNext] = useState(false);

  //if the page hasn't been visited prior, and the user has interacted with the page, autoforward if threshold is reached.
  useEffect(() => {
    if (!visitedStatus['ss'] && hasInteracted) {
      const timer = setTimeout(() => {
        setCompletionStatus('ss', true);
        setVisitedStatus('ss', true);
        if (thresholdStatus['ss']) {
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
      if (thresholdStatus['ss']) {
        setVisitedStatus('ss', true);
        router.push('/drawer/result');
      } else {
        setVisitedStatus('ss', true);
        router.push(`/drawer/${getFirstIncompletePage()}`);
      }
    }
  }, [isHandleNext]);

  const handleNext = () => {
    setCompletionStatus('ss', true);
    setIsHandleNext(true);
  };

  //handle pressing the back button
  const handleBack = () => {
    router.push('/drawer/cci');
  };

  //render the page
  return (
    <View style={styles.container}>
      <Header
        mainText="Please select the patient's surgery site"
        subText="Low risk of developing POD if surgery site is peripheral"
      />
      <ScrollView style={styles.checkboxContainer}>
        {/* Surgery site selector*/}
        <ExclusiveRadioButtons
          option1Label="Non-peripheral"
          option1Subtext="intracranial, intrathoracic, intra-abdominal or pelvic"
          option2Label="Peripheral"
          option2Subtext=""
          value={thresholdStatus['ss']} // Pass true for option 2, false for option 1
          onValueChange={(newValue) => {
            setThresholdStatus('ss', newValue); 
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

export default SSPage;
