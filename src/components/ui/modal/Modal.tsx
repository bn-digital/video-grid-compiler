import React, {FC, PropsWithChildren} from 'react';
import {
  Dimensions,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../../../theme';

type ModalProps = {
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  setShown,
  shown,
  description,
  children,
}) => {
  return (
    <RNModal
      visible={shown}
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent>
      <Pressable
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: colors.background.backdrop},
        ]}
        onPress={() => setShown(false)}
      />

      <View style={styles.backdrop}>
        <View style={styles.wrapper}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => setShown(false)}
              style={styles.closeBtn}>
              <Icon name="close" size={30} color={colors.typography.primary} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.description}>{description}</Text>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: Dimensions.get('window').width / 1.25,
    backgroundColor: colors.background.primary,
    borderRadius: spacing.borderRadius,
    overflow: 'hidden',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  closeBtn: {
    marginTop: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    paddingHorizontal: 12,
    paddingBottom: 6,
    fontSize: 14,
    lineHeight: 21,
    color: colors.typography.primary,
  },
});

export {Modal};
