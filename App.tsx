import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from '#/routes';
import Detail from '#/routes/detail';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="IndexScreen" component={Index} />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="DetailScreen"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
