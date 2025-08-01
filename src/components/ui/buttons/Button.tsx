import React, {FC} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../../../theme';

type ButtonProps = {
  onPress: () => void;
  iconName: string;
  title: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({iconName, onPress, title, disabled}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.background.invertedHighlight}
      style={styles.btn}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: disabled
              ? colors.background.invertedDisabled
              : colors.background.inverted,
          },
        ]}>
        <Icon name={iconName} size={21} color={colors.typography.inverted} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: spacing.borderRadius,
    overflow: 'hidden',
  },
  content: {
    height: 44,
    width: '100%',
    paddingHorizontal: 14,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    color: colors.typography.inverted,
  },
});

export {Button};
