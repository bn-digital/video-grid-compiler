import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../theme';
import {Card} from './cards/Card';

const VideoDetails = () => {
  return (
    <Card>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Video Details</Text>
        <View style={styles.content}>
          <View style={styles.item}>
            <Text style={styles.info} numberOfLines={1}>
              Duration:
            </Text>
            <Text
              style={styles.infoResult}
              numberOfLines={1}
              adjustsFontSizeToFit>
              0:45
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.info} numberOfLines={1}>
              Size:
            </Text>
            <Text
              style={styles.infoResult}
              numberOfLines={1}
              adjustsFontSizeToFit>
              12.5 MB
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.info} numberOfLines={1}>
              Created:
            </Text>
            <Text
              style={styles.infoResult}
              numberOfLines={1}
              adjustsFontSizeToFit>
              6/23/2025, 4:54:59 PM
            </Text>
          </View>
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
