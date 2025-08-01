import {FC, PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../../theme';

type SectionProps = {
  title: string;
  iconName: string;
};

const Section: FC<PropsWithChildren<SectionProps>> = ({
  iconName,
  title,
  children,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTop}>
        <Icon name={iconName} size={27} color={colors.typography.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.sectionMargin,
    flex: 1,
  },
  sectionTop: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.contentGap,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '500',
    color: colors.typography.primary,
  },
  content: {flex: 1},
});

export {Section};
