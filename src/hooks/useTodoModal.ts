import { useEffect, useState } from 'react';
import { useTodoContext } from '../components/context/TodoContext';
import { User } from '../types/User';
import { Todo } from '../types/Todo';
import { getUser } from '../api';

export const useTodoModal = () => {
  const { originalTodos } = useTodoContext();
  const [todoModalId, setTodoModalId] = useState<number | null>(null);
  const [userModal, setUserModal] = useState<User | null>(null);
  const [todoModal, setTodoModal] = useState<Todo | null>(null);

  useEffect(() => {
    const loadModal = async () => {
      if (todoModalId) {
        const foundTodo =
          originalTodos?.find(todo => todo.id === todoModalId) || null;

        setTodoModal(foundTodo);
      }

      const foundUser: Todo | undefined = originalTodos?.find(
        t => t.userId === todoModalId,
      );

      if (foundUser) {
        const userData = await getUser(foundUser.userId);

        setUserModal(userData);
      }
    };

    loadModal();
  }, [originalTodos, todoModalId]);

  const closeModal = () => {
    setUserModal(null);
    setTodoModal(null);
    setTodoModalId(null);
  };

  return {
    todoModal,
    userModal,
    todoModalId,
    setTodoModalId,
    closeModal,
  };
};
