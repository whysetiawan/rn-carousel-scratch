import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import colors from 'tailwindcss/colors';

import {
  useTodoListDispatch,
  type Todo,
} from '#/modules/todo/application/context/TodoListStateProvider';

const TodoListItem: React.FC<Todo> = ({ completed, id, task }) => {
  const dispatch = useTodoListDispatch();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.navigate({
          pathname: '/todo/[id]',
          params: { id },
        });
      }}
      className="flex flex-row w-full rounded-xl bg-white p-4 shadow-sm items-center justify-between">
      <View className="flex-row items-center gap-x-4">
        <Pressable onPress={() => dispatch({ type: 'toggle', payload: { id, completed, task } })}>
          <MaterialIcons
            color={colors.green[600]}
            name={completed ? 'check-box' : 'check-box-outline-blank'}
            size={20}
          />
        </Pressable>
        <Text className={`text-lg ${completed ? 'line-through' : ''}`}>{task}</Text>
      </View>
      <View className="flex-row gap-x-2">
        <Pressable
          onPress={() =>
            dispatch({
              payload: { id, completed, task },
              type: 'remove',
            })
          }>
          <MaterialIcons color={colors.red['500']} name="delete" size={24} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default TodoListItem;
