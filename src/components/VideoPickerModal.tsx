import React, {forwardRef} from 'react';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  handleImagePickerError,
  videoPickerDefaultOptions,
} from '../utils/imagePicker';
import {normalizeRef} from '../utils/normalizeRef';
import {Modal} from './ui/modal/Modal';
import {ModalList} from './ui/modal/ModalList';

type VideoPickerModalProps = {
  setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  modalShown: boolean;
  assets: (Asset | null)[];
  setAssets: React.Dispatch<React.SetStateAction<(Asset | null)[]>>;
};

const VideoPickerModal = forwardRef<number, VideoPickerModalProps>(
  ({modalShown, setModalShown, assets, setAssets}, ref) => {
    const activeIndexRef = normalizeRef(ref);

    const handleSelectVideo = async () => {
      setModalShown(false);

      if (!activeIndexRef || activeIndexRef.current === null) {
        throw new Error('No selected item');
      }

      const selectionLimit = assets.slice(activeIndexRef.current).length;

      try {
        const result = await launchImageLibrary({
          ...videoPickerDefaultOptions,
          selectionLimit,
        });

        if (result.errorCode || result.errorMessage || !result.assets) {
          return handleImagePickerError({
            errorCode: result.errorCode,
            errorMessage: result.errorMessage,
          });
        }

        const newAssets = () => {
          let index = 0;

          return assets.map((asset, i) => {
            if (i >= activeIndexRef.current! && index < result.assets!.length) {
              return result.assets![index++];
            }
            return asset;
          });
        };

        setAssets(newAssets());
        activeIndexRef.current = null;
      } catch (error) {
        console.error(error);
      }
    };

    const handleRecordVideo = async () => {
      setModalShown(false);

      if (!activeIndexRef || activeIndexRef.current === null) {
        throw new Error('No selected item');
      }

      try {
        const result = await launchCamera(videoPickerDefaultOptions);

        if (result.errorCode || result.errorMessage || !result.assets) {
          return handleImagePickerError({
            errorCode: result.errorCode,
            errorMessage: result.errorMessage,
          });
        }

        const newAssets = assets.map((asset, i) =>
          i === activeIndexRef.current ? result.assets![0] : asset,
        );

        setAssets(newAssets);
        activeIndexRef.current = null;
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal
        setShown={setModalShown}
        shown={modalShown}
        description="Choose the option">
        <ModalList
          list={[
            {
              title: 'Record Video with Camera',
              onPress: handleRecordVideo,
            },
            {
              title: 'Select Video from Library',
              onPress: handleSelectVideo,
            },
          ]}
        />
      </Modal>
    );
  },
);

export {VideoPickerModal};
