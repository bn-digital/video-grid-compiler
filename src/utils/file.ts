import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {FFprobeKit} from 'ffmpeg-kit-react-native';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const getFileExtension = (fileName?: string | null): string | null => {
  if (!fileName) {
    return null;
  }
  const match = fileName.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : null;
};

export const bytesToMB = (bytes?: number | null): number | null => {
  if (bytes == null) {
    return null;
  }
  return bytes / (1024 * 1024);
};

export const formatMB = (mb: number): string => {
  const rounded = Math.round(mb * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded.toFixed(1)}`;
};

export const formatSecondsToMMSS = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const getCompiledVideoOutputPath = (date: number) => {
  const fileName = `compiled_${date}.mp4`;
  const dir =
    Platform.OS === 'android'
      ? RNFS.DownloadDirectoryPath
      : RNFS.DocumentDirectoryPath;
  return `${dir}/${fileName}`;
};

async function hasAndroidPermission() {
  if (Platform.OS !== 'android') {
    return true;
  }

  if (Platform.Version >= 33) {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    ];

    const statuses = await PermissionsAndroid.requestMultiple(permissions);
    return (
      statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  return status === PermissionsAndroid.RESULTS.GRANTED;
}

export async function saveVideoToGallery(localVideoPath: string) {
  const hasPermission = await hasAndroidPermission();
  if (!hasPermission) {
    Alert.alert('Permission denied', 'Cannot save video without permission.');
    return;
  }

  try {
    const savedUri = await CameraRoll.saveAsset(localVideoPath, {
      type: 'video',
      album: 'Video grid compiler',
    });

    Alert.alert('Saved', 'Video saved to gallery.');
    return savedUri;
  } catch (error) {
    console.error('Error saving video:', error);
    Alert.alert('Error', 'Failed to save video.');
  }
}

export const getCompiledVideoDuration = async (
  path: string,
): Promise<number> => {
  const session = await FFprobeKit.getMediaInformation(path);
  const info = session.getMediaInformation();
  const duration = info.getDuration();
  return duration ? Math.round(duration) : 0;
};
