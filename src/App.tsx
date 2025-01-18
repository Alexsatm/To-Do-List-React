// библиотека чтобы cгенерировать айдишки
import { v1 } from 'uuid';
import { useState } from 'react';

import './App.css';
import { TodoList } from './components/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
}

export default function App() {
  // удаление таски
  // если id не равно id то пропустить таску и иначе удалить
  const removeTask = (id: string, todolistId: string) => {
    const items = itemsObj[todolistId]
    const filteredItems = items.filter(t => t.id !== id)
    itemsObj[todolistId] = filteredItems;
    setItemsObj({...itemsObj});
  };

  // добавление таски
  const addTask = (value: string, todolistId: string) => {
    const item = { id: v1(), title: value, isDone: false };
    const items = itemsObj[todolistId]
    const newItems = [item, ...items]
    itemsObj[todolistId] = newItems
    setItemsObj({...itemsObj});
  };

  // изменение статуса чекбокса
  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const items = itemsObj[todolistId]
    // должна вернуть true
    const item = items.find((t) => t.id === taskId); // и записаться в переменную task
    //если id той таски по которой мы пробегаемся, равна той айди которую нужно поменять
    if (item) {
      // если таска сущ
      item.isDone = isDone; //то isDone меняем на противоположную
      setItemsObj({...itemsObj});
    }
  };

  //чтобы легко найти нужный todoList по id и поменять значение фильтра
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    const todolist = todoLists.find(tl => tl.id === todolistId);
    if(todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists])
    }
  };

  const todolistid1 = v1();
  const todolistid2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistid1, title: 'Что вы хотите изучить', filter: 'active' },
    { id: todolistid2, title: 'Что вы хотите купить', filter: 'completed' },
  ]);

  const removeTodoList = (todolistId: string) => {
    const filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolist)

    delete itemsObj[todolistId]
    setItemsObj({...itemsObj})
  }


  const [itemsObj, setItemsObj] = useState({
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
    ]
  })

  return (
    <div className="app">
      <input type="text" /> <button>Добавить</button>
      {/* вызовится столько раз, сколько у нас объектов todoList*/}
      {todoLists.map((tl) => {

        let itemsForTodolist = itemsObj [tl.id]

        if (tl.filter === 'active') {
          itemsForTodolist = itemsForTodolist.filter((i) => i.isDone === false);
        }

        if (tl.filter === 'completed') {
          itemsForTodolist = itemsForTodolist.filter((i) => i.isDone === true);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={itemsForTodolist}
            deleteClick={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}
