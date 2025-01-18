import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

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

  // -------------------------------
  return (
    <div className="todo">
      <h1>{props.title}
        <button onClick={removeTodoList}>✖️</button>
      </h1>
      <AddItemForm id={props.id} addTask={props.addTask}/>
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

type AddItemPropsType = {
  id: string;
  addTask: (value: string, todolistId: string) => void;

}

function AddItemForm(props: AddItemPropsType) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null); //хранить в себе либо строку либо null

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      props.addTask(value, props.id);
      setValue('');
    }
  };

  const addTaskHandler = () => {
    if(value.trim() === '') { //пустую строку нельзя добавлять
      return setError('Неправильный ввод')
    }
    props.addTask(value.trim(), props.id);
    setValue('');
  };

  return (
    <div>
        <input
          type="text"
          value={value}
          onChange={changeValue}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button className="addBtn" onClick={addTaskHandler}>
          Добавить
        </button>
        {error && <div className='error-message'>{error}</div>}
      </div>
  )
}
