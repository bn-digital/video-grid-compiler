import React, {FC} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../../theme';

type ButtonProps = {
  onPress: () => void;
  iconName: string;
  title: string;
};

const Button: FC<ButtonProps> = ({iconName, onPress, title}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.background.invertedHighlight}
      style={styles.btn}
      onPress={onPress}>
      <View style={styles.content}>
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
    backgroundColor: colors.background.inverted,
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
