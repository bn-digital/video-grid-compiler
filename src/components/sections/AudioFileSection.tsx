import {pick} from '@react-native-documents/picker';
import React, {FC, useCallback, useMemo} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AUDIO_PICKER_ANDROID_TYPES,
  AUDIO_PICKER_IOS_TYPES,
} from '../../constants/mediaTypes';
import {AudioPlaceholderType} from '../../navigation/types/audio';
import {colors, spacing} from '../../theme';
import {bytesToMB, formatMB, getFileExtension} from '../../utils/file';
import {UploadSlot} from '../UploadSlot';
import {Section} from './Section';

type AudioFileSectionProps = {
  setAudio: React.Dispatch<React.SetStateAction<AudioPlaceholderType | null>>;
  audio: AudioPlaceholderType | null;
};

const AudioFileSection: FC<AudioFileSectionProps> = ({audio, setAudio}) => {
  const title = audio ? audio.name : 'Upload Audio';

  const description = useMemo(() => {
    const fileExtension = getFileExtension(audio?.name);
    const mb = bytesToMB(audio?.size);

    if (mb !== null && fileExtension && audio) {
      return `${fileExtension}, ${formatMB(mb)} mb`;
    }
    return 'mp3, wav, m4a';
  }, [audio]);

  const handlePickAudio = useCallback(async () => {
    try {
      const [result] = await pick({
        allowMultiSelection: false,
        mode: 'import',
        presentationStyle: 'formSheet',
        type:
          Platform.OS === 'ios'
            ? AUDIO_PICKER_IOS_TYPES
            : AUDIO_PICKER_ANDROID_TYPES,
      });

      if (result.error) {
        return Alert.alert('Error', result.error);
      }

      setAudio({name: result.name, uri: result.uri, size: result.size});
    } catch (error) {
      console.error(error);
    }
  }, [setAudio]);

  return (
    <Section title="Audio File" iconName="musical-notes">
      <UploadSlot onPress={handlePickAudio}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Icon
              name="musical-notes"
              size={45}
              color={colors.typography.primary}
            />
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </View>
      </UploadSlot>
    </Section>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.contentGap,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.typography.primary,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: colors.typography.secondary,
    textTransform: 'uppercase',
  },
});

export {AudioFileSection};
