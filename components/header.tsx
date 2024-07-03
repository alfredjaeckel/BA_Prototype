import { scale } from '@/utils/scaling';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/*-----------------------------------

Header Component

Provides a header for the screens in /drawer, takes header title and sub title as props

------------------------------------*/

interface HeaderProps {
  mainText?: string;
  subText?: string;
}

const Header: React.FC<HeaderProps> = ({ mainText='', subText='' }) => {
  return (
    <View style={styles.header}>
    <Text style={styles.bigText}>{mainText}</Text>
    <Text style={[styles.litteText, styles.rightText]}>{subText}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    borderBottomWidth: 1,
    height: scale(80),
  },
  bigText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  litteText: {
    fontSize: scale(16),
  },
  rightText: {
    textAlign: 'right',
  },
});

export default Header;