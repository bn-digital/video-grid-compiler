import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../theme';

type TextButtonProps = {
  text?: string;
  iconName?: string;
  onPress?: () => void;
};

const TextButton: FC<TextButtonProps> = ({iconName, text, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
      {iconName && (
        <Icon name={iconName} color={colors.typography.link} size={20} />
      )}
      {text && (
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    height: 44,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.typography.link,
  },
});

export {TextButton};
