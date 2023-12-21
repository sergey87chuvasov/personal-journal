/* eslint-disable indent */
import { useEffect, useReducer, useState, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;

    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <Input
          ref={titleRef}
          isValid={isValid.title}
          onChange={onChange}
          value={values.title}
          type='text'
          name='title'
          appearence='title'
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor='date' className={styles['form-label']}>
          <img src='./../../public/calendar.svg' alt='data pic' />
          <span>Дата</span>
        </label>
        <Input
          ref={dateRef}
          onChange={onChange}
          isValid={isValid.date}
          value={values.date}
          id='date'
          type='date'
          name='date'
          // className={cn(styles['input'], {
          //   [styles['invalid']]: !isValid.date,
          // })}
          // className={`${styles['input']} ${
          //   formValidState.date ? '' : styles['invalid']
          // }`}
          // className={`input ${formValidState.date ? '' : 'invalid'}`}
          // style={{ border: formValidState.date ? undefined : '1px solid red' }}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor='tag' className={styles['form-label']}>
          <img src='./../../public/folder.svg' alt='folder pic' />
          <span>Метки</span>
        </label>
        <Input
          onChange={onChange}
          type='text'
          name='tag'
          value={values.tag}
          id='tag'
          // className={styles['input']}
        />
      </div>

      <textarea
        ref={postRef}
        onChange={onChange}
        value={values.post}
        name='post'
        cols='30'
        rows='10'
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post,
        })}
        // className={`${styles['input']} ${
        //   formValidState.post ? '' : styles['invalid']
        // }`}
      ></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
