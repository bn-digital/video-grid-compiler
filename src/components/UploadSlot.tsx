import React, {FC, PropsWithChildren} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {colors, spacing} from '../theme';

type UploadSlotProps = {
  onPress: () => void;
};

const UploadSlot: FC<PropsWithChildren<UploadSlotProps>> = ({
  onPress,
  children,
}) => {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: colors.typography.primary,
    borderWidth: 1.9,
    borderRadius: spacing.borderRadius,
    borderStyle: 'dashed',
  },
});

export {UploadSlot};
