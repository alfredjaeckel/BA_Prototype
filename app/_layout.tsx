// app/_layout.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { Dimensions } from 'react-native';
import { scaleWidth, scaleHeight, scale } from '../utils/scaling';


const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {
const router = useRouter();
const segments = useSegments();


useEffect(() => {
  // Navigate to Step 1 when the component mounts
  router.push('/drawer/cci');
}, []); 

const isCurrentPage = (path: string) => {
  return segments.join('/') === path;
};

return (
  <View style={styles.container}>
    <View style={styles.sidebar}>
      <Text style={styles.title}>POD Risk Forecast</Text>
      <Link href="/drawer/cci" style={[styles.link, isCurrentPage('drawer/cci') && styles.boldLink]}>CCI</Link>
      <Link href="/drawer/ss" style={[styles.link, isCurrentPage('drawer/ss') && styles.boldLink]}>Surgery Site</Link>
      <Link href="/drawer/asa" style={[styles.link, isCurrentPage('drawer/asa') && styles.boldLink]}>ASA PS</Link>
      <Link href="/drawer/frailty" style={[styles.link, isCurrentPage('drawer/frailty') && styles.boldLink]}>Fraily</Link>
      <Link href="/drawer/result" style={[styles.link, isCurrentPage('drawer/result') && styles.boldLink]}>Result</Link>
    </View>
    <View style={styles.content}>
      <Stack>
        <Stack.Screen name="drawer/cci" options={screenOptions} />
        <Stack.Screen name="drawer/ss" options={screenOptions} />
        <Stack.Screen name="drawer/asa" options={screenOptions} />
        <Stack.Screen name="drawer/frailty" options={screenOptions} />
        <Stack.Screen name="drawer/result" options={screenOptions} />
      </Stack>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: scaleWidth(300),
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: scale(24),
    margin: scale(20),
  },
  link: {
    fontSize: scale(20),
    marginVertical: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  boldLink: {
    fontWeight: 'bold',
  },
});
