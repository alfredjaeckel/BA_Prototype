import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { scaleWidth, scale } from '../utils/scaling';
import { CompletionProvider, useCompletionStatus } from '../contexts/CompletionContext';

const screenOptions = { headerShown: false };

const Sidebar: React.FC = () => {
  const segments = useSegments();
  const { completionStatus, getFirstIncompletePage } = useCompletionStatus();

  const isCurrentPage = (path: string) => segments.join('/') === path;

  const links = [
    { href: '/drawer/cci', label: 'CCI', index: 'cci' },
    { href: '/drawer/ss', label: 'Surgery Site', index: 'ss' },
    { href: '/drawer/asa', label: 'ASA PS', index: 'asa' },
    { href: '/drawer/frailty', label: 'Frailty', index: 'frailty' },
    { href: '/drawer/result', label: 'Result', index: 'result' },
  ];

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>POD Risk Forecast</Text>
      <View style={styles.linkWrapper}>
        <View style={styles.circleBar}>
          {links.map((link, idx) => (
            <View key={link.href} style={styles.circleContainer}>
              <View style={[
                styles.circle, 
                link.index === getFirstIncompletePage() && styles.newCircle, 
                completionStatus[link.index] && styles.completedCircle
              ]} />
              {idx < links.length - 1 && <View style={[styles.line, completionStatus[link.index] && styles.completedLine]} />}
            </View>
          ))}
        </View>
        <View style={styles.links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={[styles.link, isCurrentPage(link.href.substring(1)) && styles.boldLink]}
            >
              {link.label}
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
};

const MainLayout: React.FC = () => {
  const router = useRouter();
  const { getFirstIncompletePage } = useCompletionStatus();

  useEffect(() => {
    const firstIncompletePage = getFirstIncompletePage();
    router.push(`/drawer/${firstIncompletePage}`);
  }, [getFirstIncompletePage, router]);

  return (
    <View style={styles.container}>
      <Sidebar />
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
};

export default function RootLayout() {
  return (
    <CompletionProvider>
      <MainLayout />
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
  link: {
    fontSize: scale(20),
    height: 80,
    lineHeight: 40
  },
  boldLink: {
    fontWeight: 'bold'
  },
  content: {
    flex: 1
  }
});