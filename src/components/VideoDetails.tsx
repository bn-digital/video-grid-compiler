import {format} from 'date-fns';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../theme';
import {formatMB, formatSecondsToMMSS} from '../utils/file';
import {Card} from './ui/cards/Card';

type VideoDetailsProps = {
  duration: number;
  size: number;
  created: number;
};

const VideoDetails: FC<VideoDetailsProps> = ({created, duration, size}) => {
  const fileSize = formatMB(size);
  const createdDate = format(created, 'dd/MM/yyyy hh:mm:ss a');
  const minutesSeconds = formatSecondsToMMSS(duration);

  const renderItem = (title: string, result: string) => {
    return (
      <View style={styles.item}>
        <Text style={styles.info} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.infoResult} numberOfLines={1} adjustsFontSizeToFit>
          {result}
        </Text>
      </View>
    );
  };

  return (
    <Card>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Video Details</Text>
        <View style={styles.content}>
          {renderItem('Duration:', minutesSeconds)}
          {renderItem('Size:', `${fileSize} MB`)}
          {renderItem('Created:', createdDate)}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.typography.primary,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {fontSize: 14, lineHeight: 21, color: colors.typography.primary},
  infoResult: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.typography.primary,
    fontWeight: '500',
  },
  wrapper: {padding: spacing.screenHorizontal, gap: 8},
  content: {gap: 6},
});

export {VideoDetails};
