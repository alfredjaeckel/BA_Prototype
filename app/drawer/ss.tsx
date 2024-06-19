import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight, scaleWidth } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';

const SSPage: React.FC = () => {
  const router = useRouter();
  const { completionStatus, setCompletionStatus } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [hasInteracted, setHasInteracted] = useState(false);

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
  
  const handleNext = () => {
    setCompletionStatus('ss', true);
    if (thresholdStatus['ss']) {
      setVisitedStatus('ss', true);
      router.push('/drawer/result');
    } else {
      setVisitedStatus('ss', true);
      router.push('/drawer/asa');
    }
  };

  const handleBack = () => {
    setCompletionStatus('ss', false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>Please select the patient's surgery site</Text>
        <Text style={styles.litteText}>Low risk of developing POD if surgery site is peripheral</Text>
      </View>
      <ScrollView style={styles.container}>
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
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  litteText: {
    fontSize: scale(16),
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
});

export default SSPage;
