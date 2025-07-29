/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import Video from 'react-native-video';
import {Button} from './components/buttons/Button';
import {TextButton} from './components/buttons/TextButton';
import {Header} from './components/Header';
import {Section} from './components/sections/Section';
import {VideoDetails} from './components/VideoDetails';
import {colors, spacing} from './theme';

function App(): React.JSX.Element {
  return (
    <>
      <SystemBars style="auto" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* <Header
          title="Upload Media"
          subtitle="Upload your videos and audio files"
        />
        <VideoFilesSection />
        <AudioFileSection />

        <View style={styles.btn}>
          <Button
            iconName="film-outline"
            onPress={() => {}}
            title="Compile Video Clip"
          />
        </View> */}
          <Header
            title="Video Compiled Successfully!"
            subtitle="Your video clip has been created and is ready to preview and download"
          />
          <Section title="Preview" iconName="play-circle">
            <Video
              source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
              style={styles.video}
              controls
            />
          </Section>

          <VideoDetails />

          <View style={styles.btn}>
            <Button
              iconName="film-outline"
              title="Compile Video Clip"
              onPress={() => {}}
            />
            <TextButton iconName="arrow-back" text="Create Another Video" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

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
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: spacing.borderRadius,
    overflow: 'hidden',
  },
});

export default App;
