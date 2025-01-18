import { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemPropsType = {
  addItem: (value: string) => void;

}

export function AddItemForm(props: AddItemPropsType) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null); //хранить в себе либо строку либо null

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      props.addItem(value);
      setValue('');
    }
  };

  const addTaskHandler = () => {
    if(value.trim() === '') { //пустую строку нельзя добавлять
      return setError('Неправильный ввод')
    }
    props.addItem(value.trim());
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