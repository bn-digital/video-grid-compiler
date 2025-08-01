import React, {FC, useCallback, useMemo} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, spacing} from '../../theme';
import {AudioPlaceholderType} from '../../types/audio';
import {
  getLocalCopyOfVirtualAudio,
  pickAudioFile,
} from '../../utils/audioPicker';
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
      const file = await pickAudioFile();
      if (!file) {
        return;
      }

      if (file.isVirtual || Platform.OS === 'ios') {
        return setAudio({name: file.name, uri: file.uri, size: file.size});
      }

      const localUri = await getLocalCopyOfVirtualAudio(file);
      if (localUri) {
        setAudio({name: file.name, uri: localUri, size: file.size});
      }
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
