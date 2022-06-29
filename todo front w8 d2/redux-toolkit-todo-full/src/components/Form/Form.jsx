
import React, { useState } from 'react';
import styles from './form.module.css'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addTodos } from '../../features/todoSlice';

const Form = () => {
    const [text, setText] = useState('')

    const handleSetText = (e) =>{
        setText(e.target.value)
    }
const dispatch = useDispatch()

const handleSubmit=(e)=> {
    e.preventDefault()
    if(text !== ''){
        dispatch(addTodos(text))
    }
    setText('')
}
const loading = useSelector((state)=>state.loading)

    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
            type='text'
            value={text}
            onChange={handleSetText}
            className={styles.input}
            placeholder='Введите дело'
            ></input>
            <button type='submit' className={loading ? styles.btnOff : styles.btn} >Добавить</button>
        </form>
        </>
    );
};

export default Form;