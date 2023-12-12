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

function App() {
  const data = [
    {
      title: 'Подготовка к обновлению курсов',
      text: 'Горные походы открывают удивительные природные ландшафты!',
      date: new Date(),
    },
    {
      title: 'Разработка к обновлению тем',
      text: 'Никогда не говори никогда!',
      date: new Date(),
    },
    {
      title: 'Привет, как дела?',
      text: 'Я помню чудное мгновенье',
      date: new Date(),
    },
  ];

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButoon />
        <JournalList>
          {data.map((el) => (
            <CardButton>
              <JournalItem title={el.title} text={el.text} data={el.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm />
      </Body>
    </div>
  );
}

export default App;
