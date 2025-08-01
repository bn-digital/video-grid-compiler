import React, {FC} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

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
    gap: 6,
    backgroundColor: colors.background.backdrop,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.typography.inverted,
    fontWeight: '500',
  },
});

export {ScreenLoader};
