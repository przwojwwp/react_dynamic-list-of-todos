import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  todoModalId: number | null;
  onModalButtonClick: (userId: number) => void;
};

export const TodoList = ({ todos, todoModalId, onModalButtonClick }: Props) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos?.map(todo => {
          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {!todo.completed ? (
                <td className="is-vcentered" />
              ) : (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={`${!todo.completed ? 'has-text-danger' : 'has-text-success'}`}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onModalButtonClick(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${todoModalId === todo.id ? '-slash' : ''}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
