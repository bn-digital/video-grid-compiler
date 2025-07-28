/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from './components/Button';
import {Header} from './components/Header';
import {AudioFileSection} from './components/sections/AudioFileSection';
import {VideoFilesSection} from './components/sections/VideoFilesSection';
import {colors, spacing} from './theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
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
        </View>
      </View>
    </SafeAreaView>
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
  },
});

export default App;
