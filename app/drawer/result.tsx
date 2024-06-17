import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ResultPage = () => {
  const searchParams = useLocalSearchParams();
  const fromPage = searchParams.from;

  // Function to convert page identifier to a user-friendly name
  const getPageName = (pageIdentifier: string) => {
    switch (pageIdentifier) {
      case 'cci':
        return 'CCI';
      case 'ss':
        return 'Surgery Site';
      case 'asa':
        return 'ASA PS';
      case 'frailty':
        return 'Frailty';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result Page</Text>
      <Text style={styles.content}>You navigated from: {getPageName(fromPage)}</Text>
    </View>
  );
};

// Styles for the ResultPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default ResultPage;