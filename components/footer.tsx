import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface FooterProps {
  back?: boolean;
  next?: boolean;
  backText?: string;
  nextText?: string;
  handleBack?: () => void;
  handleNext: () => void;
}

const Footer: React.FC<FooterProps> = ({ back=true, next=true, backText='Back', nextText='Next', handleBack, handleNext }) => {
  return (
    <View style={styles.footer}>
      {back && (
      <TouchableOpacity 
        onPress={handleBack}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{backText}</Text>
      </TouchableOpacity>
      )}
      {!back && (
        <View/>
      )}
      {next && (
      <TouchableOpacity 
        onPress={handleNext}
        style={styles.nextButton}
      >
        <Text style={styles.nextButtonText}>{nextText}</Text>
      </TouchableOpacity>
      )}
      {!next && (
        <View/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderTopWidth: 1,
    height: scale(80),
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

export default Footer;