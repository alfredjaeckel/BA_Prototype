import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useThresholdStatus } from '@/contexts/CompletionContext';
import { scale } from '@/utils/scaling';

const ResultPage = () => {
  const searchParams = useLocalSearchParams();
  const fromPage = searchParams.from;
  const { thresholdStatus } = useThresholdStatus();

const handleNext = () => {
  //router.push('/drawer/asa');
};

interface Content {
  index: string;
  header: string;
  subHeader: string;
  back: string;
}
const contents: Content[] = [
  {index: 'cci', header: 'Please select the patients conditions', subHeader: 'High risk of developing POD if CCI > 1', back: '/drawer/cci'},
  {index: 'asa', header: 'Please select the patient\'s ASA PS', subHeader: 'High risk of developing POD if ASA PS III or higher', back: '/drawer/asa'},
  {index: 'ss', header: 'Please select the patient\'s surgery site', subHeader: 'Low risk of developing POD if surgery site is peripheral', back: '/drawer/ss'},
  {index: 'frailtyhigh', header: 'Please select the patients frailty status', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail', back: '/drawer/frailty'},
  {index: 'frailtylow', header: 'Please select the patients frailty status', subHeader: 'Low risk of developing POD if stable \n High risk of developing POD if pre-frail or frail', back: '/drawer/frailty'},
];

const result = (): string => {
  if (thresholdStatus['cci']) {
    return 'cci'
  } 
  else if (thresholdStatus['ss']) {
    return 'ss';
  }
  else if (thresholdStatus['asa']) {
    return 'asa';
  }
  else if (thresholdStatus['frailty']) {
    return 'frailtyhigh';
  }
  else {
    return 'frailtylow';
  }
}

const renderContentBasedOnThreshold = () => {
  // Example logic: render different content if ASA PS is III or higher
  if (thresholdStatus['cci']) {
    return <Text style={styles.bigText}>High risk CCI</Text>;
  } 
  else if (thresholdStatus['ss']) {
    return <Text style={styles.bigText}>Low risk based on SS.</Text>;
  }
  else if (thresholdStatus['asa']) {
    return <Text style={styles.bigText}>High risk based on ASA PS.</Text>;
  }
  else if (thresholdStatus['frailty']) {
    return <Text style={styles.bigText}>High risk based on Frailty.</Text>;
  }
  else {
    return <Text style={styles.bigText}>Low risk based on Frailty.</Text>;
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>{contents.find(item => item.index === result())?.header}</Text>
        <Text style={styles.litteText}>{contents.find(item => item.index === result())?.subHeader}</Text>
      </View>
      <ScrollView style={styles.container}>
        {renderContentBasedOnThreshold()}
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
    height: scale(80),
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
});

export default ResultPage;