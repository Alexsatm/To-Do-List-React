import { ChangeEvent } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditTableSpan } from './EditableSpan';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

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
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (id: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
};

export function TodoList(props: PropsType) {
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  // -------------------------------
  return (
    <div className="todo">
      <h1>
        <EditTableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList} aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h1>
      <AddItemForm addItem={addTask} />
      {/* ---------------------------- */}
      <ul>
        {props.tasks.map((item) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(item.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(item.id, newValue, props.id);
          };

          return (
            <li key={item.id} className={item.isDone ? 'is-done' : ''}>
              <Checkbox checked={item.isDone} onChange={onChangeStatusHandler} />
              <EditTableSpan title={item.title} onChange={onChangeTitleHandler} />
              <IconButton
                onClick={() => props.deleteClick(item.id, props.id)}
                aria-label="delete"
                size="large"
                color="error"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </li>
          );
        })}
      </ul>
      {/* --------------------------- */}
      <Stack spacing={1} direction="row">
        <Button
          variant={props.filter === 'all' ? "contained" : "outlined"}
          onClick={() => props.changeFilter('all', props.id)}
        >
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? "contained" : "outlined"}
          onClick={() => props.changeFilter('active', props.id)}
          color={"success"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'completed' ? "contained" : "outlined"}
          onClick={() => props.changeFilter('completed', props.id)}
          color={"warning"}
        >
          Completed
        </Button>
      </Stack>
    </div>
  );
}