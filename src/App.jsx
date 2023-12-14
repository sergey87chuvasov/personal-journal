/* eslint-disable indent */
import './App.css';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalAddButoon from './components/JournalAddButoon/JournalAddButoon';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Подготовка к обновлению курсов',
    text: 'Горные походы открывают удивительные природные ландшафты!',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Разработка к обновлению тем',
    text: 'Никогда не говори никогда!',
    date: new Date(),
  },
  {
    id: 3,
    title: 'Список дел на Новый Год',
    text: 'В разработке на пару страниц',
    date: new Date(),
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButoon />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
