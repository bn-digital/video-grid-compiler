import {Routes} from './routes';

export type RootStackParamList = {
  [Routes.UPLOAD_MEDIA]: undefined;
  [Routes.COMPILED_VIDEO]: {
    videoInfo: {size: number; duration: number; created: number; path: string};
    audioPath: string;
  };
};
