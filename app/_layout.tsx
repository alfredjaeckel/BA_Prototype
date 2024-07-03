import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { CompletionProvider } from '../contexts/CompletionContext';
import { NotesProvider } from '@/contexts/NotesContext';

/*-----------------------------------

Root layout of the application.

------------------------------------*/


export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); 

  //when the app is first loaded, open the startpage
  useEffect(() => {
    if (segments.length === 0) {
      router.push(`startpage`);
    }
  }, [segments, router]);

  //wrap the application pages, with the required contexts
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