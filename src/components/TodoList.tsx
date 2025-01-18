import { ChangeEvent} from 'react';
import { FilterValuesType } from '../App';

import { AddItemForm } from './AddItemForm'

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  deleteClick: (id: string, todolistId: string) => void;
  addTask: (value: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
};

export function TodoList(props: PropsType) {

  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const addTask = (title:string) => {
    props.addTask(title, props.id)
  }

  // -------------------------------
  return (
    <div className="todo">
      <h1>{props.title}
        <button onClick={removeTodoList}>✖️</button>
      </h1>
      <AddItemForm addItem={addTask}/>
      {/* ---------------------------- */}
      <ul>
        {props.tasks.map((item) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(item.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={item.id} className={item.isDone ? 'is-done' : ""}>
              <input type="checkbox" checked={item.isDone} onChange={onChangeHandler} placeholder='введите'/>
              <span>{item.title}</span>
              <button onClick={() => props.deleteClick(item.id, props.id)}>❌</button>
            </li>
          );
        })}
      </ul>
      {/* --------------------------- */}
      <div className="btns">
        <button onClick={() => props.changeFilter('all', props.id)} className={props.filter === 'all' ? 'active-filter' : ''}>
          All
        </button>
        <button onClick={() => props.changeFilter('active', props.id)} className={props.filter === 'active' ? 'active-filter' : ''}>
          Active
        </button>
        <button onClick={() => props.changeFilter('completed', props.id)} className={props.filter === 'completed' ? 'active-filter' : ''}>
          Completed
        </button>
      </div>
    </div>
  );
}