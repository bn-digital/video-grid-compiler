/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SystemBars} from 'react-native-edge-to-edge';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackNavigator} from './navigation/navigators/RootStackNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SystemBars style="auto" />

      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
