/* eslint-disable indent */
import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    post: true,
    date: true,
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }

    if (!isFormValid) {
      return;
    }

    onSubmit(formProps);
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          name='title'
          className={cn(styles['input-title'], {
            [styles['invalid']]: !formValidState.title,
          })}
          // className={`${styles['input']} ${
          //   formValidState.title ? '' : styles['invalid']
          // }`}
          // style={{ border: formValidState.title ? undefined : '1px solid red' }}
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
            [styles['invalid']]: !formValidState.date,
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
          [styles['invalid']]: !formValidState.post,
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
