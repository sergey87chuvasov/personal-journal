/* eslint-disable indent */
import { useState } from 'react';
import Button from '../Button/Button';
import './JournalForm.css';

function JournalForm() {
  const [inputData, setInputData] = useState('');

  const inputChange = (e) => {
    setInputData(e.target.value);
  };

  const addJournalItem = (e) => {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    e.preventDefault();
    console.log(e);
    console.log(formProps);
  };

  return (
    <form className='journal-form' onSubmit={addJournalItem}>
      <input type='text' name='title' />
      <input type='date' name='date' />
      <input type='text' name='tag' value={inputData} onChange={inputChange} />
      <textarea name='post' id='' cols='30' rows='10'></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
