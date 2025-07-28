import React, {FC} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../theme';

type ModalListProps = {
  list: {title: string; onPress: () => void}[];
};

const ModalList: FC<ModalListProps> = ({list}) => {
  return (
    <View>
      {list.map(({onPress, title}, index) => (
        <TouchableHighlight
          underlayColor={colors.background.highlight}
          onPress={onPress}
          key={index}>
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    lineHeight: 27,
    color: colors.typography.primary,
    fontWeight: '500',
  },
});

export {ModalList};
