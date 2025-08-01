import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/buttons/Button';
import {Header} from '../../components/Header';
import {ScreenLoader} from '../../components/ScreenLoader';
import {AudioFileSection} from '../../components/sections/AudioFileSection';
import {VideoFilesSection} from '../../components/sections/VideoFilesSection';
import {compileGridVideo} from '../../ffmpeg/compileGridVideo';
import {colors, spacing} from '../../theme';
import {AudioPlaceholderType} from '../types/audio';
import {RootStackParamList} from '../types/params';
import {Routes} from '../types/routes';

const videoSlots = new Array(4).fill(null);

const UploadMediaScreen = () => {
  const [assets, setAssets] = useState<(Asset | null)[]>(videoSlots);
  const [audio, setAudio] = useState<AudioPlaceholderType | null>(null);
  const [compiling, setCompiling] = useState<boolean>(false);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, Routes.UPLOAD_MEDIA>
    >();

  const compileDisabled =
    assets.some(asset => !asset || !asset.uri) ||
    assets.length !== 4 ||
    audio === null;

  const handleCompilePress = async () => {
    if (compileDisabled) {
      return;
    }

    const videos = assets.map(asset => asset!.uri!);

    setCompiling(true);

    try {
      const compiledGridVideo = await compileGridVideo({
        audioUri: audio.uri,
        videoUris: videos,
      });

      if (!compiledGridVideo) {
        return Alert.alert('Error', 'Something went wrong');
      }

      navigation.navigate(Routes.COMPILED_VIDEO, {
        created: compiledGridVideo.createdTime,
        duration: compiledGridVideo.duration,
        path: compiledGridVideo.path,
        size: compiledGridVideo.size,
      });
    } finally {
      setCompiling(false);
    }
  };

  return (
    <>
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
              onPress={handleCompilePress}
              title="Compile Video Clip"
            />
          </View>
        </View>
      </SafeAreaView>
      <ScreenLoader shown={compiling} title="Compiling..." />
    </>
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
