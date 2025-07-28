import {Alert, Platform} from 'react-native';
import {CameraOptions} from 'react-native-image-picker';

export const handleImagePickerError = (params: {
  errorCode?: string;
  errorMessage?: string;
}) => {
  const {errorCode, errorMessage} = params;

  if (errorCode === 'camera_unavailable') {
    return Alert.alert('Error', 'Camera not available on device');
  }
  if (errorCode === 'permission') {
    return Alert.alert('Error', 'Permission not satisfied');
  }

  if (errorMessage) {
    return Alert.alert('Error', errorMessage);
  }
  return Alert.alert('Error', 'Something went wrong');
};

export const videoPickerDefaultOptions: CameraOptions = {
  mediaType: 'video',
  videoQuality: Platform.OS === 'ios' ? 'medium' : 'low',
  presentationStyle: 'formSheet',
  formatAsMp4: true,
};
