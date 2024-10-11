import type { PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  {
    completed: false,
    id: 1,
    task: 'Learn React',
  },
  {
    completed: true,
    id: 2,
    task: 'Learn TypeScript',
  },
];

interface AddTodoActions {
  type: 'add';
  payload: Omit<Todo, 'id'>;
}

interface RemoveTodoActions {
  type: 'remove';
  payload: Todo;
}

interface ToggleTodoActions {
  type: 'toggle';
  payload: Todo;
}

interface EditTodoActions {
  type: 'edit';
  payload: Todo;
}

type TodoActionsType = AddTodoActions | RemoveTodoActions | ToggleTodoActions | EditTodoActions;

const todoReducer = (state: Todo[], action: TodoActionsType): Todo[] => {
  switch (action.type) {
    case 'add':
      const lastId = state[state.length - 1]?.id ?? 0;
      return [
        ...state,
        {
          id: lastId,
          ...action.payload,
        },
      ];
    case 'remove':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'edit':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.task, completed: action.payload.completed }
          : todo,
      );
    default:
      return state;
  }
};

const TodoListStateContext = createContext<Todo[]>(initialTodos);
const TodoListDispatchContext = createContext<React.Dispatch<TodoActionsType>>(() => {});

const TodoListStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <TodoListStateContext.Provider value={todos}>
      <TodoListDispatchContext.Provider value={dispatch}>
        {children}
      </TodoListDispatchContext.Provider>
    </TodoListStateContext.Provider>
  );
};

const useTodoListState = () => {
  const context = useContext(TodoListStateContext);
  if (context === undefined) {
    throw new Error('useTodoListState must be used within a TodoListProvider');
  }
  return context;
};

const useTodoListDispatch = () => {
  const context = useContext(TodoListDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoListDispatch must be used within a TodoListProvider');
  }
  return context;
};

export { TodoListStateProvider, useTodoListState, useTodoListDispatch };
