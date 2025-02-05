import { TextField } from "@mui/material";
import { useState } from "react"
import { ChangeEvent} from 'react';

type EditTableSpanProps = {
  title: string;
  onChange: (newValue: string) => void
}

export function EditTableSpan(props:EditTableSpanProps) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return (
    editMode
      ? <TextField onChange={onChangeTitleHandler} onBlur={activateViewMode} type="text" value={title} autoFocus variant="standard" size="small"/>
      : <span onDoubleClick={activateEditMode} >{props.title}</span>
  )
}