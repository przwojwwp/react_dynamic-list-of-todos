/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodoContext } from './components/context/TodoContext';
import { useTodoModal } from './hooks/useTodoModal';

export const App: React.FC = () => {
  const { originalTodos } = useTodoContext();
  const { todoModal, userModal, todoModalId, setTodoModalId, closeModal } =
    useTodoModal();

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
              {originalTodos === null ? (
                <Loader />
              ) : (
                <TodoList
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
          onCloseButtonClick={closeModal}
        />
      )}
    </>
  );
};
