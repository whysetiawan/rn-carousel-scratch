import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { useTodoListUiDispatch } from '#/modules/todo/application/context/TodoListUiProvider';

const TodoListAddFloatingBtn = () => {
  const dispatch = useTodoListUiDispatch();
  return (
    <Pressable
      onPress={() => {
        dispatch({
          type: 'showAddModal',
        });
      }}
      className="absolute rounded-full bottom-8 right-8 px-4 py-4 bg-blue-400">
      <MaterialIcons name="add" size={32} color="white" />
    </Pressable>
  );
};

export default TodoListAddFloatingBtn;
