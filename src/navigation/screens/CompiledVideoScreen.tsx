import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {Header} from '../../components/Header';
import {VideoDetails} from '../../components/VideoDetails';
import {Button} from '../../components/buttons/Button';
import {TextButton} from '../../components/buttons/TextButton';
import {Section} from '../../components/sections/Section';
import {colors, spacing} from '../../theme';
import {RootStackParamList} from '../types/params';
import {Routes} from '../types/routes';

const CompiledVideoScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, Routes.COMPILED_VIDEO>
    >();
  const {params} =
    useRoute<RouteProp<RootStackParamList, Routes.COMPILED_VIDEO>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title="Video Compiled Successfully!"
          subtitle="Your video clip has been created and is ready to preview and download"
        />
        <Section title="Preview" iconName="play-circle">
          <View style={styles.videoSection}>
            <Video source={{uri: params.path}} style={styles.video} controls />

            <VideoDetails
              created={params.created}
              duration={params.duration}
              size={params.size}
            />
          </View>
        </Section>

        <View style={styles.btn}>
          <Button
            iconName="download-outline"
            title="Download Video"
            onPress={() => {}}
          />
          <TextButton
            iconName="arrow-back"
            text="Create Another Video"
            onPress={() => {
              navigation.goBack();
            }}
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
    gap: spacing.contentGap,
  },
  video: {
    flex: 1,
    aspectRatio: 9 / 16,
    borderRadius: spacing.borderRadius,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  videoSection: {flex: 1, gap: spacing.contentGap},
});

export {CompiledVideoScreen};
