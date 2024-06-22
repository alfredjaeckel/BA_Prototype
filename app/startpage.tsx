// src/pages/StartPage.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus, useOverrideStatus } from '@/contexts/CompletionContext'; 
import { useNotes } from '@/contexts/NotesContext';
import { scale } from '@/utils/scaling';


const StartPage: React.FC = () => {
  const router = useRouter();
  const {completionStatus} = useCompletionStatus();
  const {thresholdStatus} = useThresholdStatus();
  const {overrideStatus} = useOverrideStatus();
  const { notes, deleteNote } = useNotes();


  const handleStart = () => {
    if(completionStatus['result']){
        router.push('/drawer/result');
    }
    else{
        router.push('/drawer');
    }
  };

  const forecastStatus = () => {

    if(overrideStatus['override'] && overrideStatus['newValue']){
      return(
        <Text style={styles.bigText}>Manually Set: Patient needs further screening</Text>
      )
    }
    else if(overrideStatus['override']){
      return <Text style={styles.bigText}>Manually Set: Patient does not need further screening</Text>
    }
    else if(completionStatus['result'] && thresholdStatus['result']){
      return <Text style={styles.bigText}>POD Risk Forecast is high: Patient needs further screening</Text>
    }
    else if(completionStatus['result'] && thresholdStatus['result']){
        return <Text style={styles.bigText}>POD Risk Forecast is high: Patient needs further screening</Text>
    }
    else if(completionStatus['result']){
        return <Text style={styles.bigText}>POD Risk Forecast is low: Patient does not needs further screening</Text>
    }
    else{
        return(
          <Text style={styles.bigText}>Start POD Risk Forecast</Text>
        )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Premedication{'\n'}Checklist</Text>
      </View>
      <View style={styles.page}>
        <TouchableOpacity 
          onPress={handleStart} 
          style={styles.button}
        >
          {forecastStatus()}
          <ScrollView style={styles.notesContainer}>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <View key={index} style={styles.note}>
                <Text>{note}</Text>
                <Button title="Delete" onPress={() => deleteNote(index)} />
              </View>
            ))
          ) : (
            <Text>No notes available</Text>
          )}
        </ScrollView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },  
  sidebar: {
    width: scale(300),
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRightWidth: 1
  },
  page: {
    flex: 1,
    padding: scale(40),
  },
  button: {
    borderWidth: scale(2),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: scale(24),
    margin: scale(20)
  },
  bigText: {
    fontSize: scale(20),
  },
  notesContainer: {
    marginTop: scale(20),
  },
  note: {
    padding: scale(10),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default StartPage;
