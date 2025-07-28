import {forwardRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../theme';
import {normalizeRef} from '../utils/normalizeRef';
import {UploadSlot} from './UploadSlot';

const borderWidth = spacing.dottedBorderWidth * 2;
const screenMargin = spacing.screenHorizontal * 2;
const rowItemsCount = 2;

const SLOT_SIZE =
  (Dimensions.get('window').width - spacing.contentGap - screenMargin) /
    rowItemsCount -
  borderWidth;

type VideoPlaceholderProps = {
  text: string;
  index: number;
  setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VideoPlaceholder = forwardRef<number, VideoPlaceholderProps>(
  ({text, index, setModalShown}, ref) => {
    const activeIndexRef = normalizeRef(ref);

    const handlePress = (number: number) => {
      if (!activeIndexRef) {
        throw new Error('Item: No active index ref provided');
      }

      activeIndexRef.current = number;
      setModalShown(true);
    };

    return (
      <UploadSlot onPress={() => handlePress(index)}>
        <View style={styles.item}>
          <Icon name="videocam" size={30} color={colors.typography.primary} />
          <Text style={styles.text} numberOfLines={2}>
            {text}
          </Text>
        </View>
      </UploadSlot>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: SLOT_SIZE,
    height: 110,
  },
  text: {
    color: colors.typography.primary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
