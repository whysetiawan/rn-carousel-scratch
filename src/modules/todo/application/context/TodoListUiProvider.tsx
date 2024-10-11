import type { PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';

export interface TodoListUiState {
  isAdding: boolean;
}

export interface TodoListUiAction {
  type: 'showAddModal' | 'hideAddModal';
}

const TodoListUiStateCtx = createContext<TodoListUiState>({
  isAdding: false,
});

const TodoListUiDispatchCtx = createContext<React.Dispatch<TodoListUiAction>>(() => {});

const todoListUiReducer = (state: TodoListUiState, action: TodoListUiAction) => {
  switch (action.type) {
    case 'showAddModal':
      return { ...state, isAdding: true };
    case 'hideAddModal':
      return { ...state, isAdding: false };
    default:
      return state;
  }
};

const TodoListUiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(todoListUiReducer, { isAdding: false });

  return (
    <TodoListUiStateCtx.Provider value={state}>
      <TodoListUiDispatchCtx.Provider value={dispatch}>{children}</TodoListUiDispatchCtx.Provider>
    </TodoListUiStateCtx.Provider>
  );
};

const useTodoListUiState = () => {
  const context = useContext(TodoListUiStateCtx);
  if (context === undefined) {
    throw new Error('useTodoListUiState must be used within a TodoListUiProvider');
  }
  return context;
};

const useTodoListUiDispatch = () => {
  const context = useContext(TodoListUiDispatchCtx);
  if (context === undefined) {
    throw new Error('useTodoListUiDispatch must be used within a TodoListUiProvider');
  }
  return context;
};

export { TodoListUiProvider, useTodoListUiState, useTodoListUiDispatch };
