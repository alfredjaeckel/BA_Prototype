import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { scaleWidth, scale } from '../utils/scaling';
import { CompletionProvider, useCompletionStatus, useThresholdStatus } from '../contexts/CompletionContext';

const screenOptions = { headerShown: false };

const Sidebar: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { completionStatus, getFirstIncompletePage } = useCompletionStatus();
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const [showModal, setShowModal] = React.useState(false);

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
      setShowModal(true);
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

      {/* Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Please complete the other pages first.</Text>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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