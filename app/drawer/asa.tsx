import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight, scaleWidth } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';

const ASAPage: React.FC = () => {
  const router = useRouter();
  const { completionStatus, setCompletionStatus } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();

  const handleNext = () => {
    setCompletionStatus('asa', true);
    if (thresholdStatus['asa']) {
      router.push('/drawer/result');
    } else {
      router.push('/drawer/frailty');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>Please select the patient's ASA PS</Text>
        <Text style={styles.litteText}>High risk of developing POD if ASA PS III or higher</Text>
      </View>
      <ScrollView style={styles.container}>
        <ExclusiveRadioButtons
          option1Label="ASA I / II"
          option1Subtext="a patient with at most mild systemic disease"
          option2Label="ASA III / IV / V"
          option2Subtext="a patient with at least moderate systemic disease"
          value={thresholdStatus['asa']} // Pass true for option 2, false for option 1
          onValueChange={(newValue) => setThresholdStatus('asa', newValue)}
        />
      </ScrollView>
      <View style={styles.footer}>
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
    justifyContent: 'flex-end',
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
});

export default ASAPage;
