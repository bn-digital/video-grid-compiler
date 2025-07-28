import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {spacing} from '../../theme';
import {VideoPickerModal} from '../modal/VideoPickerModal';
import {VideoPlaceholder} from '../VideoPlaceholder';
import {Section} from './Section';

const videoSlots = new Array(4).fill(null);

const VideoFilesSection = () => {
  const [assets, setAssets] = useState<(Asset | null)[]>(videoSlots);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const activeIndex = useRef<number | null>(null);

  const rows = [assets.slice(0, 2), assets.slice(2, 4)];

  return (
    <>
      <Section title="Video Files" iconName="videocam">
        <View style={styles.rows}>
          {rows.map((row, rowIndex) => (
            <View style={styles.row} key={`row-${rowIndex}`}>
              {row.map((asset, colIndex) => {
                const assetIndex = rowIndex * row.length + colIndex;

                return (
                  <VideoPlaceholder
                    text={
                      asset
                        ? asset.fileName || 'No Name'
                        : `Video ${assetIndex + 1}`
                    }
                    ref={activeIndex}
                    index={assetIndex}
                    setModalShown={setModalShown}
                    key={assetIndex}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </Section>

      <VideoPickerModal
        assets={assets}
        setAssets={setAssets}
        modalShown={modalShown}
        setModalShown={setModalShown}
        ref={activeIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  rows: {gap: spacing.contentGap},
  row: {
    gap: spacing.contentGap,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export {VideoFilesSection};
