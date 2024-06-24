import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { CompletionProvider } from '../contexts/CompletionContext';
import { NotesProvider } from '@/contexts/NotesContext';

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