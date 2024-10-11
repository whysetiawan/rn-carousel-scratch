import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { TodoListUiProvider } from '#/modules/todo/application/context/TodoListUiProvider';
import TodoList from '#/modules/todo/presentation/TodoList';
import TodoListAddFloatingBtn from '#/modules/todo/presentation/TodoListAddFloatingBtn';
import TodoListAddModal from '#/modules/todo/presentation/TodoListAddModal';

import '../../global.css';

const Index = () => {
  return (
    <TodoListUiProvider>
      <StatusBar translucent={false} />
      <TodoList />
      <TodoListAddFloatingBtn />
      <TodoListAddModal />
    </TodoListUiProvider>
  );
};

export default Index;
