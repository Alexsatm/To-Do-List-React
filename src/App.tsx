// библиотека чтобы cгенерировать айдишки
import { v1 } from 'uuid';
import { useState } from 'react';

// import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { AddItemForm } from './components/AddItemForm';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Grid2, Toolbar, Typography, Paper } from '@mui/material';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export default function App() {
  // удаление таски
  // если id не равно id то пропустить таску и иначе удалить
  const removeTask = (id: string, todolistId: string) => {
    const items = itemsObj[todolistId];
    const filteredItems = items.filter((t) => t.id !== id);
    itemsObj[todolistId] = filteredItems;
    setItemsObj({ ...itemsObj });
  };

  // добавление таски
  const addTask = (value: string, todolistId: string) => {
    const item = { id: v1(), title: value, isDone: false };
    const items = itemsObj[todolistId];
    const newItems = [item, ...items];
    itemsObj[todolistId] = newItems;
    setItemsObj({ ...itemsObj });
  };

  // изменение статуса чекбокса
  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const items = itemsObj[todolistId];
    // должна вернуть true
    const item = items.find((t) => t.id === taskId); // и записаться в переменную task
    //если id той таски по которой мы пробегаемся, равна той айди которую нужно поменять
    if (item) {
      // если таска сущ
      item.isDone = isDone; //то isDone меняем на противоположную
      setItemsObj({ ...itemsObj });
    }
  };

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    const items = itemsObj[todolistId];
    // должна вернуть true
    const task = items.find((t) => t.id === taskId); // и записаться в переменную task
    //если id той таски по которой мы пробегаемся, равна той айди которую нужно поменять
    if (task) {
      // если таска сущ
      task.title = newTitle;
      setItemsObj({ ...itemsObj });
    }
  };

  //чтобы легко найти нужный todoList по id и поменять значение фильтра
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    const todolist = todoLists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const todolistid1 = v1();
  const todolistid2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistid1, title: 'Что вы хотите изучить', filter: 'all' },
    { id: todolistid2, title: 'Что вы хотите купить', filter: 'all' },
  ]);

  const removeTodoList = (todolistId: string) => {
    const filteredTodolist = todoLists.filter((tl) => tl.id !== todolistId);
    setTodoLists(filteredTodolist);

    delete itemsObj[todolistId];
    setItemsObj({ ...itemsObj });
  };

  const changeTodoListTitle = (id: string, newTitle: string) => {
    const todolist = todoLists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  const [itemsObj, setItemsObj] = useState<TasksStateType>({
    [todolistid1]: [
      { id: v1(), title: 'Html', isDone: true },
      { id: v1(), title: 'Css', isDone: true },
      { id: v1(), title: 'Js', isDone: false },
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'Git', isDone: false },
    ],
    [todolistid2]: [
      { id: v1(), title: 'Книгу', isDone: true },
      { id: v1(), title: 'Хлеб', isDone: true },
      { id: v1(), title: 'Масло', isDone: false },
      { id: v1(), title: 'Макароны', isDone: true },
      { id: v1(), title: 'Овощи ', isDone: false },
    ],
  });

  function addTodoList(title: string) {
    const todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    };

    setTodoLists([todolist, ...todoLists]);
    setItemsObj({
      ...itemsObj,
      [todolist.id]: [],
    });
  }

  return (
    <div className="app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid2 container style={{padding:"10px"}}>
          <AddItemForm addItem={addTodoList} />
        </Grid2>
        <Grid2 container spacing={3}>
          {/* вызовится столько раз, сколько у нас объектов todoList*/}
          {todoLists.map((tl) => {
            let itemsForTodolist = itemsObj[tl.id];

            if (tl.filter === 'active') {
              itemsForTodolist = itemsForTodolist.filter((i) => i.isDone === false);
            }

            if (tl.filter === 'completed') {
              itemsForTodolist = itemsForTodolist.filter((i) => i.isDone === true);
            }

            return (
              <Grid2>
                <Paper elevation={3} style={{padding:"10px"}}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={itemsForTodolist}
                    deleteClick={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </div>
  );
}
