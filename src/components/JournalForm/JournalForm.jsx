/* eslint-disable indent */
import { useEffect, useReducer, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;

    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
        setFormValidState(INITIAL_STATE);
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          name='title'
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title,
          })}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor='date' className={styles['form-label']}>
          <img src='./../../public/calendar.svg' alt='data pic' />
          <span>Дата</span>
        </label>
        <input
          id='date'
          type='date'
          name='date'
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
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
        <input type='text' name='tag' id='tag' className={styles['input']} />
      </div>

      <textarea
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
