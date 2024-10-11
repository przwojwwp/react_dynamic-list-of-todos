import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type TodoContextProps = {
  originalTodos: Todo[] | null;
};

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }

  return context;
};

type TodoContextProviderProps = React.PropsWithChildren<{}>;

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [originalTodos, setOriginalTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos().then(setOriginalTodos);
    };

    loadTodos();
  }, []);

  // const [filter, setFilter] = useState<Filter>('All');
  // const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);

  // const filterTodos = (filter: Filter) => {
  //   if (filter === 'Active') {
  //     return originalTodos?.filter(todo => !todo.completed);
  //   }

  //   if (filter === 'Completed') {
  //     return originalTodos?.filter(todo => todo.completed);
  //   }

  //   return originalTodos;
  // };

  const value = {
    originalTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
