import { ChangeEvent, useState, KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemPropsType = {
  addItem: (value: string) => void;
};

export function AddItemForm(props: AddItemPropsType) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null); //хранить в себе либо строку либо null

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      props.addItem(value);
      setValue('');
    }
  };

  const addTaskHandler = () => {
    if (value.trim() === '') {
      //пустую строку нельзя добавлять
      return ('Неправильный ввод');
    }
    props.addItem(value.trim());
    setValue('');
  };

  return (
    <div>
      <TextField
        label="Введите"
        variant="outlined"
        value={value}
        size="small"
        onChange={changeValue}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <Button onClick={addTaskHandler} variant="contained" color="success" >
        Добавить
      </Button>
    </div>
  );
}
