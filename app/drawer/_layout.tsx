import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { scaleWidth, scale } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useOverrideStatus } from '@/contexts/CompletionContext';
import ExitModal from '@/components/ExitModal';
import IncompleteModal from '@/components/IncompleteModal';

const screenOptions = { headerShown: false };

const Sidebar: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { completionStatus, setCompletionStatus, getFirstIncompletePage } = useCompletionStatus();
  const { thresholdStatus} = useThresholdStatus();
  const { setOverrideStatus } = useOverrideStatus();
  const [showIncompleteModal, setShowIncompleteModal] = React.useState(false);
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [exitLowRisk, setExitLowRisk] = React.useState(false);
  const [exitHighRisk, setExitHighRisk] = React.useState(false);
  const [exitUnknownRisk, setExitUnknownRisk] = React.useState(false);

  useEffect(() => {
    setOverrideStatus('override', false);
  }, [thresholdStatus]);
  
  useEffect(() => {
    if(exitLowRisk){
      console.log('exitLowRisk');
      setOverrideStatus('override', true);
      setOverrideStatus('newValue', false);
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitLowRisk]);

  useEffect(() => {
    if(exitHighRisk){
      console.log('exitHighRisk');
      setOverrideStatus('override', true);
      setOverrideStatus('newValue', true);
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitHighRisk]);

  useEffect(() => {
    if(exitUnknownRisk){
      console.log('exitUnknownRisk');
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitUnknownRisk]);


  useEffect(() => {
    setCompletionStatus('ss', false);
    setCompletionStatus('asa', false);
    setCompletionStatus('frailty', false);
    setCompletionStatus('result', false);
  }, [thresholdStatus['cci']]);

  useEffect(() => {
    setCompletionStatus('asa', false);
    setCompletionStatus('frailty', false);
    setCompletionStatus('result', false);
  }, [thresholdStatus['ss']]);

  useEffect(() => {
    setCompletionStatus('frailty', false);
    setCompletionStatus('result', false);
  }, [thresholdStatus['asa']]);

  useEffect(() => {
    setCompletionStatus('result', false);
  }, [thresholdStatus['frailty']]);
  

  const isCurrentPage = (path: string) => segments.join('/') === path;

  const links = [
    { href: '/drawer/cci', label: 'CCI', index: 'cci', order: 0},
    { href: '/drawer/ss', label: 'Surgery Site', index: 'ss', order: 1},
    { href: '/drawer/asa', label: 'ASA PS', index: 'asa', order: 2},
    { href: '/drawer/frailty', label: 'Frailty', index: 'frailty', order: 3},
    { href: '/drawer/result', label: 'Result', index: 'result', order: 4},
  ];

  const prevLinkIndex = (index: string): string => {
    switch(index) {
      case 'cci':
        return 'none';
      case 'ss':
        return 'cci';
      case 'asa':
        return 'ss';
      case 'frailty':
        return 'asa';
      case 'result':
        return 'none';
      default:
        return 'none';
    }
  }

  const sidebarText = (index: string, threshold: boolean): string => {
    switch(index){
      case 'cci':
        return threshold ? "CCI > 1" : "CCI ≤ 1";
      case 'ss':
        return threshold ? "Peripheral" : "Non-p eripheral";
      case 'asa':
        return threshold ? "ASA III / IV / V" : "ASA I / II";
      case 'frailty':
        return threshold ? "Pre-frail or frail" : "Stable";
      default:
        return "";
    }
  }


  const handleLinkClick = (index: string) => {
    if(prevLinkIndex(index) === 'none' || (completionStatus[prevLinkIndex(index)] && !thresholdStatus[prevLinkIndex(index)])) {
      router.push(`/drawer/${index}`);
      return;
    } else {
      setShowIncompleteModal(true);
    } 
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>POD Risk Forecast</Text>
      <View style={styles.linkWrapper}>
        <View style={styles.circleBar}>
          {links.map((link, idx) => (
            <View key={link.href} style={styles.circleContainer}>
              <View
                style={[
                  styles.circle,
                  link.index === getFirstIncompletePage() && !thresholdStatus[prevLinkIndex(link.index)] && styles.newCircle,
                  completionStatus[link.index] && styles.completedCircle,
                ]}
              />
              {idx < links.length - 1 && (
                <View style={[styles.line, completionStatus[link.index] && !thresholdStatus[link.index]&& styles.completedLine]} />
              )}
            </View>
          ))}
        </View>
        <View style={styles.links}>
          {links.map((link) => (
            <View style={styles.linkbox}
            key={link.href}
            >
              <TouchableOpacity
                onPress={() => handleLinkClick(link.index)}
              >
                <Text
                style={[
                  styles.link, 
                  isCurrentPage(link.href.substring(1)) && styles.boldLink,
                  (!completionStatus[prevLinkIndex(link.index)] && prevLinkIndex(link.index) !== 'none') && styles.disabledLink,
                ]}
                >
                  {link.label}
                </Text>
              </TouchableOpacity>
              {completionStatus[link.index] && (
                <Text style={styles.disabledLink}>
                  {sidebarText(link.index, thresholdStatus[link.index])}
                </Text>
              )}
            </View>     
          ))}
        </View>
      </View>
      <TouchableOpacity 
          onPress={() => setShowExitModal(true)}
          style={styles.exitButton}
        >
          <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
      {/* Exit Modal */}
      <ExitModal
        isExitModalVisible={showExitModal}
        onClose={() => setShowExitModal(false)}
        setExitLowRisk={() => setExitLowRisk(true)}
        setExitHighRisk={() => setExitHighRisk(true)}
        setExitUnknownRisk={() => setExitUnknownRisk(true)}
      />
      {/* Incomplete Modal */}
      <IncompleteModal
        isIncompleteModalVisible={showIncompleteModal}
        onClose={() => setShowIncompleteModal(false)}
      />
    </View>
  );
};

const MainLayout: React.FC = () => {
  const router = useRouter();
  const { getFirstIncompletePage } = useCompletionStatus();
  const segments = useSegments(); 
  

  useEffect(() => {
    if (segments.length === 0) {
      const firstIncompletePage = getFirstIncompletePage();
      router.push(`/drawer/${firstIncompletePage}`);
    }
  }, [segments, getFirstIncompletePage, router]);

  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.content}>
        <Stack>
          <Stack.Screen name="cci" options={screenOptions} />
          <Stack.Screen name="ss" options={screenOptions} />
          <Stack.Screen name="asa" options={screenOptions} />
          <Stack.Screen name="frailty" options={screenOptions} />
          <Stack.Screen name="result" options={screenOptions} />
        </Stack>
      </View>
    </View>
  );
};

export default function RootLayout() {
  return (
    <MainLayout />
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
    padding: scale(20),
    paddingTop: scale(25),
    paddingBottom: scale(10),
    borderRightWidth: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(24),
  },
  linkWrapper: {
    flexDirection: 'row',
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
  exitButton: {
    backgroundColor: '#FFCCCC',
    height: scale(60),
    width: scale(220),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonText: {
    color: 'red',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});