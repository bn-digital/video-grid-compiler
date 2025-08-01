import {FFprobeKit} from 'ffmpeg-kit-react-native';
import {Platform} from 'react-native';
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

export const getCompiledVideoDuration = async (
  path: string,
): Promise<number> => {
  const session = await FFprobeKit.getMediaInformation(path);
  const info = session.getMediaInformation();
  const duration = info.getDuration();
  return duration ? Math.round(duration) : 0;
};
