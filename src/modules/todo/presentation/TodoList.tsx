import React from 'react';
import { FlatList, View } from 'react-native';

import { useTodoListState } from '#/modules/todo/application/context/TodoListStateProvider';
import TodoListItem from '#/modules/todo/presentation/TodoListItem';
import '../../../../global.css';

const TodoList: React.FC = () => {
  const todos = useTodoListState();

  return (
    <FlatList
      contentContainerClassName="pt-8 px-4 bg flex-grow flex flex-1"
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoListItem {...item} />}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
};

export default TodoList;
