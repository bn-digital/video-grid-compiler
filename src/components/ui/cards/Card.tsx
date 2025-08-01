import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, spacing} from '../../../theme';

const Card: FC<PropsWithChildren> = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.borderRadius,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export {Card};
