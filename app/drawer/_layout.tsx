import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { scaleWidth, scale } from '@/utils/scaling';
import { useCompletionStatus, useThresholdStatus, useOverrideStatus, useFileStatus } from '@/contexts/CompletionContext';
import ExitModal from '@/components/ExitModal';
import IncompleteModal from '@/components/IncompleteModal';
import FileModal from '@/components/FileModal';

/*-----------------------------------

Baselayout for the cue pages

Composed of sidebar, that stays the same over all pages and the content of a cue page

------------------------------------*/

const screenOptions = { headerShown: false };

//layout for sidebar
const Sidebar: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { completionStatus, setCompletionStatus, getFirstIncompletePage, getLastCompletePage } = useCompletionStatus();
  const { fileStatus } = useFileStatus();
  const { thresholdStatus} = useThresholdStatus();
  const { setOverrideStatus } = useOverrideStatus();
  const [showIncompleteModal, setShowIncompleteModal] = React.useState(false);
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [exitLowRisk, setExitLowRisk] = React.useState(false);
  const [exitHighRisk, setExitHighRisk] = React.useState(false);
  const [exitUnknownRisk, setExitUnknownRisk] = React.useState(false);

  // if one of the cues is changed, set the override status to false
  useEffect(() => {
    setOverrideStatus('override', false);
  }, [thresholdStatus]);
  
  // handle exiting setting the overriding in favour of low risk
  useEffect(() => {
    if(exitLowRisk){
      console.log('exitLowRisk');
      setOverrideStatus('override', true);
      setOverrideStatus('newValue', false);
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitLowRisk]);

  // handle exiting setting the overriding in favour of high risk
  useEffect(() => {
    if(exitHighRisk){
      console.log('exitHighRisk');
      setOverrideStatus('override', true);
      setOverrideStatus('newValue', true);
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitHighRisk]);

  // handle exiting without setting an override
  useEffect(() => {
    if(exitUnknownRisk){
      console.log('exitUnknownRisk');
      setShowExitModal(false);
      router.push('startpage');
    }
  }, [exitUnknownRisk]);

  // if a cues threshold value is changed, reset the completion status of cues further down the tree
  // this ensures proper functioning of the sidebar links, and the progress bar
  useEffect(() => {
    setCompletionStatus('ss', fileStatus['ss']);
    setCompletionStatus('asa', fileStatus['asa']);
    setCompletionStatus('frailty', fileStatus['frailty']);
    setCompletionStatus('result', fileStatus['result']);
  }, [thresholdStatus['cci']]);

  useEffect(() => {
    setCompletionStatus('asa', fileStatus['asa']);
    setCompletionStatus('frailty', fileStatus['frailty']);
    setCompletionStatus('result', fileStatus['result']);
  }, [thresholdStatus['ss']]);

  useEffect(() => {
    setCompletionStatus('frailty', fileStatus['frailty']);
    setCompletionStatus('result', fileStatus['result']);
  }, [thresholdStatus['asa']]);

  useEffect(() => {
    setCompletionStatus('result', fileStatus['result']);
  }, [thresholdStatus['frailty']]);
  

  const isCurrentPage = (path: string) => segments.join('/') === path;

  //define the links for use in the sidebar
  const links = [
    { href: '/drawer/cci', label: 'CCI', index: 'cci', order: 0},
    { href: '/drawer/ss', label: 'Surgery Site', index: 'ss', order: 1},
    { href: '/drawer/asa', label: 'ASA PS', index: 'asa', order: 2},
    { href: '/drawer/frailty', label: 'Frailty', index: 'frailty', order: 3},
    { href: '/drawer/result', label: 'Result', index: 'result', order: 4},
  ];

  //return the previous cue
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

  //values to indicate thresholds in the sidebar
  const sidebarText = (index: string, threshold: boolean): string => {
    switch(index){
      case 'cci':
        return threshold ? "CCI > 1" : "CCI ≤ 1";
      case 'ss':
        return threshold ? "Peripheral" : "Non-peripheral";
      case 'asa':
        return threshold ? "ASA III / IV / V" : "ASA I / II";
      case 'frailty':
        return threshold ? "Pre-frail or frail" : "Stable";
      default:
        return "";
    }
  }

  //when a link is clicked, check if the previous cue is completed and the cue is allowed to be accessed
  // if not, show the incomplete modal
  const handleLinkClick = (index: string) => {
    if(`drawer/${prevLinkIndex(index)}` === segments.join('/') && !thresholdStatus[prevLinkIndex(index)]) {
      setCompletionStatus(prevLinkIndex(index), true);
      router.push(`/drawer/${index}`);
      console.log("setpagetrue")
      return;
    }
    else if(prevLinkIndex(index) === 'none' || (completionStatus[prevLinkIndex(index)] && !thresholdStatus[prevLinkIndex(index)])) {
      router.push(`/drawer/${index}`);
      return;
    } else {
      setShowIncompleteModal(true);
    } 
  };

  //render the page content
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>POD Risk Forecast</Text>
      <View style={styles.linkWrapper}>
        <View style={styles.circleBar}>
          {/* map all links to display the progress bar next to them*/}
          {links.map((link, idx) => (
            <View key={link.href} style={styles.circleContainer}>
              <View
                style={[
                  styles.circle,
                  link.index === getFirstIncompletePage() && !thresholdStatus[prevLinkIndex(link.index)] && styles.newCircle,
                  completionStatus[link.index] && styles.completedCircle,
                  isCurrentPage(link.href.substring(1)) && styles.newCircle,

                ]}
              />
              {idx < links.length - 1 && (
                <View 
                style={[
                  styles.line, 
                  completionStatus[link.index] && !thresholdStatus[link.index]&& styles.completedLine,
                ]} />
              )}
            </View>
          ))}
        </View>
        <View style={styles.links}>
          {/* map all links to show their labels and if applicable values in the sidebar*/}
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
      {/* Exit Button*/}
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
//page layout with sidebar and content
const MainLayout: React.FC = () => {
  const router = useRouter();
  const { getFirstIncompletePage, getLastCompletePage } = useCompletionStatus();
  const { fileStatus } = useFileStatus();
  const segments = useSegments(); 
  const [fileModal, setFileModal] = React.useState(false);
  const [showFileModal, setShowFileModal] = React.useState(false);
  
  //default to showing the first cue that has not been completed, by the user or from patient data
  useEffect(() => {
    if (segments.join('/') === 'drawer') {
      const firstIncompletePage = getFirstIncompletePage();
      const lastCompletePage = getLastCompletePage();
      if (fileStatus[lastCompletePage]) {
        setFileModal(true);
      }
      router.push(`/drawer/${firstIncompletePage}`);
    }
  }, [segments, getFirstIncompletePage, router]);

  //show the file modal for 6 seconds when a patient data is loaded for a cue
  useEffect(() => {
    if (fileModal === true) {
      setShowFileModal(true);
      const timer = setTimeout(() => setShowFileModal(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [fileModal]);

  //render the page
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
        <FileModal
          isFileModalVisible={showFileModal}
          onClose={() => setShowFileModal(false)}
        />
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
    width: scaleWidth(270),
    backgroundColor: '#f0f0f0',
    padding: scale(20),
    paddingTop: scale(25),
    paddingBottom: scale(15),
    borderRightWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderWidth: scale(3),
  },
  completedCircle: {
    backgroundColor: 'blue'
  },
  line: {
    borderWidth: scale(3),
    flex: 1,
    borderColor: '#ccc'
  },
  completedLine: {
    borderColor: 'blue'
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