import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { scaleWidth, scale } from '../utils/scaling';
import { CompletionProvider } from '../contexts/CompletionContext';
import { NotesProvider } from '@/contexts/NotesContext';

const screenOptions = { headerShown: false };



export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); 

  useEffect(() => {
    if (segments.length === 0) {
      router.push(`startpage`);
    }
  }, [segments, router]);

  
  return (
    <CompletionProvider>
      <NotesProvider>
        <Stack>
          <Stack.Screen name="startpage" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
        </Stack>
      </NotesProvider>
    </CompletionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  sidebar: {
    width: scaleWidth(300),
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRightWidth: 1
  },
  title: {
    fontSize: scale(24),
    margin: scale(20)
  },
  linkWrapper: {
    marginTop: 80,
    flexDirection: 'row'
  },
  circleBar: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    padding: 10
  },
  circleContainer: {
    alignItems: 'center',
    height: 80
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc'
  },
  newCircle: {
    borderColor: 'blue',
    borderWidth: 2
  },
  completedCircle: {
    backgroundColor: 'blue'
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#ccc'
  },
  completedLine: {
    backgroundColor: 'blue'
  },
  links: {
    justifyContent: 'flex-start'
  },
  linkbox: {
    height: 80,
    justifyContent: 'flex-start',
  },
  link: {
    fontSize: scale(20),
    lineHeight: 40
  },
  boldLink: {
    fontWeight: 'bold'
  },
  disabledLink: {
    color: 'gray'
  },
  content: {
    flex: 1
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: scale(20),
    borderRadius: scale(10),
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: scale(18),
    marginBottom: scale(20),
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
  },
  modalButtonText: {
    color: 'white',
    fontSize: scale(16),
  },
});