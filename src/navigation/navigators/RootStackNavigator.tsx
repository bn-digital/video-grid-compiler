import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CompiledVideoScreen} from '../screens/CompiledVideoScreen';
import {UploadMediaScreen} from '../screens/UploadMediaScreen';
import {RootStackParamList} from '../types/params';
import {Routes} from '../types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.UPLOAD_MEDIA} component={UploadMediaScreen} />
      <Stack.Screen
        name={Routes.COMPILED_VIDEO}
        component={CompiledVideoScreen}
      />
    </Stack.Navigator>
  );
};

export {RootStackNavigator};
