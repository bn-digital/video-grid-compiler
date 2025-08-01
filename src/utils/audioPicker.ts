import {
  DocumentPickerResponse,
  keepLocalCopy,
  pick,
} from '@react-native-documents/picker';
import {Alert, Platform} from 'react-native';
import {
  AUDIO_PICKER_ANDROID_TYPES,
  AUDIO_PICKER_IOS_TYPES,
} from '../constants/mediaTypes';

export const pickAudioFile = async () => {
  const [file] = await pick({
    allowMultiSelection: false,
    mode: 'import',
    presentationStyle: 'formSheet',
    type:
      Platform.OS === 'ios'
        ? AUDIO_PICKER_IOS_TYPES
        : AUDIO_PICKER_ANDROID_TYPES,
    allowVirtualFiles: true,
  });

  if (file?.error) {
    Alert.alert('Error', file.error);
    return null;
  }

  return file;
};

export const getLocalCopyOfVirtualAudio = async (
  file: DocumentPickerResponse,
) => {
  const virtualFileMeta = file.convertibleToMimeTypes?.[0];
  if (!file.name || !virtualFileMeta) {
    throw new Error('name and virtualFileMeta is required');
  }

  const [copyResult] = await keepLocalCopy({
    files: [
      {
        uri: file.uri,
        fileName: `${file.name}.${virtualFileMeta.extension ?? ''}`,
        convertVirtualFileToType: virtualFileMeta.mimeType,
      },
    ],
    destination: 'cachesDirectory',
  });

  if (copyResult.status === 'success') {
    return copyResult.localUri;
  }

  return null;
};
