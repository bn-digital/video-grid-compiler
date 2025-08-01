import React, {FC} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../theme';

type ScreenLoaderProps = {shown: boolean; title: string};

const ScreenLoader: FC<ScreenLoaderProps> = ({shown, title}) => {
  return (
    <Modal
      visible={shown}
      style={styles.modal}
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.typography.inverted} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.contentGap,
    backgroundColor: colors.background.backdrop,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.typography.inverted,
    fontWeight: '500',
  },
});

export {ScreenLoader};
