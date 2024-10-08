import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CciCheckbox from '../../components/CciCheckbox'; 
import useConditions from '@/constants/ccidata';
import { scale } from '../../utils/scaling';
import { useCompletionStatus, useThresholdStatus, useVisitedStatus } from '../../contexts/CompletionContext'; 
import CciInfoModal from '@/components/CciInfoModal';
import Footer from '@/components/footer';
import Header from '@/components/header';


/*-----------------------------------

CCI cue page

------------------------------------*/

const CciPage: React.FC = () => {
  const { conditionState, setConditionValue, setConditionWeight, sumConditionValues } = useConditions();
  const [isCciInfoVisible, setIsCciInfoVisible] = useState(false);
  const [cciInfoContent, setCciInfoContent] = useState({ name: '', info: '' });
  const router = useRouter();
  const { setCompletionStatus, getFirstIncompletePage } = useCompletionStatus();
  const [hasInteracted, setHasInteracted] = useState(false);
  const { thresholdStatus, setThresholdStatus } = useThresholdStatus();
  const { visitedStatus, setVisitedStatus } = useVisitedStatus();
  const [isHandleNext, setIsHandleNext] = useState(false);
  
  //update the threshold based on CCI calculation
  useEffect(() => {
    const sum = sumConditionValues();
    if (thresholdStatus['cci'] !== (sum > 1)) {
      setThresholdStatus('cci', sum > 1);
    }
  }, [conditionState, setThresholdStatus, sumConditionValues]);

  //if the page hasn't been visited prior, and the user has interacted with the page, autoforward if threshold is reached.
  useEffect(() => {
    if (!visitedStatus['cci'] && hasInteracted) {
      const timer = setTimeout(() => {
        setCompletionStatus('cci', true);
        setVisitedStatus('cci', true);
        if (thresholdStatus['cci']) {
          router.push({
            pathname: '/drawer/result',
            params: { showPopup: 'true' }
          });
        }
      }, 500); // 1/2 second delay
      return () => clearTimeout(timer);
    }
  }, [thresholdStatus]);

  //handle pressing the next button
  useEffect(() => {
    if (isHandleNext) {
      if (thresholdStatus['cci']) {
        setVisitedStatus('cci', true);
        router.push('/drawer/result');
      } else {
        setVisitedStatus('cci', true);
        router.push(`/drawer/${getFirstIncompletePage()}`);
      }
    }
  }, [isHandleNext]);

  const handleNext = () => {
    setCompletionStatus('cci', true);
    setIsHandleNext(true);
  };

  //handle inputs to checkboxes, and severity selectors
  const handleCheckboxChange = useCallback((index: number, value: boolean) => {
    setHasInteracted(true);
    setConditionValue(index, value);
  }, [setConditionValue]);

  const handleSelectorChange = useCallback((index: number, weight: number) => {
    setHasInteracted(true);
    setConditionWeight(index, weight);
  }, [setConditionWeight]);
  
  //open the info modal when the question mark is clicked
  const handleQuestionMarkClick = (name: string, info: string) => {
    setCciInfoContent({ name, info });
    setIsCciInfoVisible(true);
  };


  //render the page
  return (
    <View style={styles.container}>
      <Header
        mainText="Please select the patients conditions"
        subText="High risk of developing POD if CCI > 1"
      />
      <ScrollView>
        {/* CCI Illness Checkboxes*/}
        <View style={styles.checkboxContainer}>
          {conditionState.map((condition) => (
            <View key={condition.index}>
                <CciCheckbox
                  name={condition.name}
                  index={condition.index}
                  weight={condition.weight}
                  handleQuestionMarkClick={handleQuestionMarkClick}
                  handleSelectorChange={handleSelectorChange}
                  showInfo={condition.showInfo}
                  info={condition.info}
                  value={condition.value}
                  onValueChange={(newValue) => handleCheckboxChange(condition.index, newValue)}
                />
            </View>
          ))}
          <CciInfoModal
            isCciInfoModalVisible={isCciInfoVisible}
            name={cciInfoContent.name}
            info={cciInfoContent.info}
            onClose={() => setIsCciInfoVisible(false)}
          />
        </View>
      </ScrollView>
      <Footer
        back={false}
        handleNext={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
  },
});

export default CciPage;