import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, ToastAndroid, View } from 'react-native';
import colors from 'tailwindcss/colors';

import {
  useTodoListDispatch,
  useTodoListState,
} from '#/modules/todo/application/context/TodoListStateProvider';
import TodoDetailSaveBtn from '#/modules/todo/presentation/TodoDetailSaveBtn';
import Input from '#/shared/components/Input';

const TodoItemDetail: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const todos = useTodoListState();

  const todo = todos.find((todo) => todo.id === parseInt(params.id));
  const [task, setTask] = useState(todo?.task ?? '');
  const [checked, setChecked] = useState(todo?.completed ?? false);
  const dispatch = useTodoListDispatch();

  return (
    <>
      <View className="flex flex-1 flex-col px-4 py-8">
        <View className="flex flex-row w-full bg-white rounded-xl p-5 shadow-sm justify-between items-center gap-y-4">
          <View className="gap-y-2 flex-1 pr-8 ">
            {/* <Text className="text-xl">{todo?.task}</Text> */}
            <Input.Underlined
              containerStyle={{
                paddingVertical: 4,
              }}
              className={checked ? 'line-through' : ''}
              value={task}
              onChangeText={setTask}
            />

            <Text className="text-slate-950/50">{checked ? 'Completed' : 'Not Complete'}</Text>
          </View>

          <Pressable onPress={() => setChecked((prev) => !prev)}>
            <MaterialIcons
              color={colors.green[600]}
              name={checked ? 'check-box' : 'check-box-outline-blank'}
              size={20}
            />
          </Pressable>
        </View>
        <Text className="text-center text-sm font-bold">Press save to apply changes</Text>
      </View>
      <TodoDetailSaveBtn
        onPress={() => {
          router.back();
          ToastAndroid.show('Todo updated', ToastAndroid.SHORT);
          dispatch({
            payload: {
              id: todo!.id,
              completed: checked,
              task,
            },
            type: 'edit',
          });
        }}
      />
    </>
  );
};

export default TodoItemDetail;
