import 'react-native-reanimated';
import '../../global.css';
import { Stack } from 'expo-router';

import { TodoListStateProvider } from '#/modules/todo/application/context/TodoListStateProvider';

export default function RootLayout() {
  return (
    <TodoListStateProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="todo/[id]"
          options={{
            title: 'Edit Todo',
          }}
        />
      </Stack>
    </TodoListStateProvider>
  );
}
