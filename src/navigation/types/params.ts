import {Routes} from './routes';

export type RootStackParamList = {
  [Routes.UPLOAD_MEDIA]: undefined;
  [Routes.COMPILED_VIDEO]: {
    size: number;
    duration: number;
    created: number;
    path: string;
  };
};
