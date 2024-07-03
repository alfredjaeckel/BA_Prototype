import { useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';


/*-----------------------------------

Default route, should only appear when making a bad routing

------------------------------------*/

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bad routing</Text>
    </View>
  );
}
