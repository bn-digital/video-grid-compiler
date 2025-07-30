import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/buttons/Button';
import {Header} from '../../components/Header';
import {AudioFileSection} from '../../components/sections/AudioFileSection';
import {VideoFilesSection} from '../../components/sections/VideoFilesSection';
import {colors, spacing} from '../../theme';
import {AudioPlaceholderType} from '../types/audio';
import {RootStackParamList} from '../types/params';
import {Routes} from '../types/routes';

const videoSlots = new Array(4).fill(null);

const UploadMediaScreen = () => {
  const [assets, setAssets] = useState<(Asset | null)[]>(videoSlots);
  const [audio, setAudio] = useState<AudioPlaceholderType | null>(null);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, Routes.UPLOAD_MEDIA>
    >();

  const compileDisabled = assets.some(asset => !asset) || audio === null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title="Upload Media"
          subtitle="Upload your videos and audio files"
        />
        <VideoFilesSection assets={assets} setAssets={setAssets} />
        <AudioFileSection audio={audio} setAudio={setAudio} />

        <View style={styles.btn}>
          <Button
            disabled={compileDisabled}
            iconName="film-outline"
            onPress={() => {
              if (compileDisabled) {
                return;
              }

              navigation.navigate(Routes.COMPILED_VIDEO, {
                videoInfo: {
                  created: Date.now(),
                  duration: 0,
                  path: '',
                  size: 0,
                },
                audioPath: audio.uri,
              });
            }}
            title="Compile Video Clip"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.screenVertical,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: spacing.contentGap,
  },
});

export {UploadMediaScreen};
