import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TodoListUiProvider } from '#/modules/todo/application/context/TodoListUiProvider';
import TodoList from '#/modules/todo/presentation/TodoList';
import TodoListAddFloatingBtn from '#/modules/todo/presentation/TodoListAddFloatingBtn';
import TodoListAddModal from '#/modules/todo/presentation/TodoListAddModal';

import '../../global.css';

const Index = () => {
  return (
    <TodoListUiProvider>
      <StatusBar translucent={false} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TodoList />
        </View>
      </SafeAreaView>
      <TodoListAddFloatingBtn />
      <TodoListAddModal />
    </TodoListUiProvider>
  );
};

export default Index;
