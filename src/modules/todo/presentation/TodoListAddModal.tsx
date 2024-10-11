import { useState } from 'react';
import { Modal, Text, ToastAndroid, View } from 'react-native';

import { useTodoListDispatch } from '#/modules/todo/application/context/TodoListStateProvider';
import {
  useTodoListUiDispatch,
  useTodoListUiState,
} from '#/modules/todo/application/context/TodoListUiProvider';
import BackDrop from '#/shared/components/Backdrop';
import Button from '#/shared/components/Button';
import Input from '#/shared/components/Input';

const TodoListAddModal = () => {
  const { isAdding } = useTodoListUiState();
  const dispatch = useTodoListUiDispatch();
  const todoDispatch = useTodoListDispatch();

  const [task, setTask] = useState('');

  const hideModal = () => {
    dispatch({
      type: 'hideAddModal',
    });
  };

  const addTodo = () => {
    if (!task) {
      return ToastAndroid.show('Task cannot be empty', ToastAndroid.SHORT);
    }

    hideModal();
    todoDispatch({
      type: 'add',
      payload: {
        task,
        completed: false,
      },
    });
    setTask('');
  };

  return (
    <Modal statusBarTranslucent onRequestClose={hideModal} visible={isAdding} transparent>
      <BackDrop
        visible={isAdding}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={hideModal}>
        <View className="items-center w-full justify-center px-8">
          <View className="bg-white w-full rounded-xl p-4 shadow-sm gap-y-8">
            <Text className="text-xl text-center ">Add Todo</Text>
            <Input.Outlined value={task} onChangeText={setTask} placeholder="Enter task" />
            <Button.Solid onPress={addTodo}>Add</Button.Solid>
          </View>
        </View>
      </BackDrop>
    </Modal>
  );
};

export default TodoListAddModal;
