/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoModalId, setTodoModalId] = useState<number | null>(null);
  const [userModal, setUserModal] = useState<User | null>(null);
  const [todoModal, setTodoModal] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos().then(setTodos);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (todoModalId) {
        setTodoModal(todos?.find(todo => todo.id === todoModalId) || null);

        const todo: Todo | undefined = await todos?.find(
          t => t.userId === todoModalId,
        );

        if (todo) {
          const userData = await getUser(todo.userId);

          setUserModal(userData);
        }
      }
    };

    loadUser();
  }, [todoModalId, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos === null ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  todoModalId={todoModalId}
                  onModalButtonClick={setTodoModalId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoModalId && (
        <TodoModal
          todoModal={todoModal}
          userModal={userModal}
          onCloseButtonClick={() => {
            setUserModal(null);
            setTodoModalId(null);
          }}
        />
      )}
    </>
  );
};
