import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const ASAPage = () => {
  const [answer, setAnswer] = useState(null);
  const router = useRouter();

  const handleDecision = (userAnswer: boolean) => {
    if (userAnswer) {
      // Navigate to the results page with the current page name as a parameter
      router.push(`/drawer/result?from=asa`);
    } else {
      // Navigate to the next page in the sequence
      router.push('/drawer/frailty');
    }
  };

  return (
    <View>
      <Text>Does the patient have a history of cardiac issues?</Text>
      <Button title="Yes" onPress={() => handleDecision(true)} />
      <Button title="No" onPress={() => handleDecision(false)} />
    </View>
  );
};

export default ASAPage;