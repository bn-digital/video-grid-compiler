import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header: FC<HeaderProps> = ({title, subtitle}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '600',
    color: colors.typography.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.typography.secondary,
    textAlign: 'center',
  },
});

export {Header};
