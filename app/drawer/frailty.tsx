import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, scaleHeight, scaleWidth } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus } from '@/contexts/CompletionContext'; 
import ExclusiveRadioButtons from '@/components/ExclusiveRadioButtons';

const FrailtyPage: React.FC = () => {
  const router = useRouter();
  const { completionStatus, setCompletionStatus } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();

  const handleNext = () => {
    setCompletionStatus('frailty', true);
    router.push('/drawer/result');
  };

  const handleBack = () => {
    setCompletionStatus('frailty', false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>Please select the patients frailty status</Text>
        <Text style={styles.litteText}>{"Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail"}</Text>
      </View>
      <ScrollView style={styles.container}>
        <ExclusiveRadioButtons
          option1Label="Stable"
          option1Subtext="patient exhibits non of the frailty criteria"
          option2Label="Frail or pre-frail"
          option2Subtext="patient exhibits one or more of the frailty criteria"
          value={thresholdStatus['frailty']} // Pass true for option 2, false for option 1
          onValueChange={(newValue) => setThresholdStatus('frailty', newValue)}
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
    textAlign: 'right',
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

export default FrailtyPage;
