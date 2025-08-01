import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {
  CompileGridVideoParams,
  CompileGridVideoResult,
} from '../navigation/types/compile';
import {
  bytesToMB,
  getCompiledVideoDuration,
  getCompiledVideoOutputPath,
} from '../utils/file';
import {buildFFmpegCommand} from './buildCommand';
import {buildFFmpegFilters} from './buildFilters';

export const compileGridVideo = async (
  params: CompileGridVideoParams,
): Promise<CompileGridVideoResult> => {
  const {audioUri, videoUris} = params;

  const createdAt = Date.now();
  const outputPath = getCompiledVideoOutputPath(createdAt);

  const videoInputs = videoUris.map(uri => `-i "${uri}"`).join(' ');
  const audioInput = `-i "${audioUri}"`;

  try {
    const duration = await getCompiledVideoDuration(audioUri);
    const filters = buildFFmpegFilters(duration);
    const command = buildFFmpegCommand({
      videoInputs,
      audioInput,
      filters,
      outputPath,
      audioIndex: videoUris.length,
      duration,
    });

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (!returnCode.isValueSuccess()) {
      const logs = await session.getAllLogsAsString();
      Alert.alert('Error', 'Compiling is not successful');
      throw new Error('FFmpeg failed: ' + logs);
    }

    const exists = await RNFS.exists(outputPath);
    if (!exists) {
      throw new Error('Compiled file not found');
    }

    const stats = await RNFS.stat(outputPath);
    const size = bytesToMB(Number(stats.size));

    return {
      path: outputPath,
      duration,
      size: size || 0,
      createdTime: createdAt,
    };
  } catch (err) {
    Alert.alert('Error', 'Something went wrong during compilation');
    console.error(err);
    return null;
  }
};
