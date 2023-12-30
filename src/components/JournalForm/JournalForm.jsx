/* eslint-disable indent */
import { useEffect, useReducer, useContext, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const { userId } = useContext(UserContext);

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
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data]);

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
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId },
    });
  }, [userId]);

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
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
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
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
