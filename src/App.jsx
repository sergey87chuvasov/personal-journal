/* eslint-disable indent */
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem.Jsx';

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
    <>
      <h1>TITLE</h1>
      <Button />
      <CardButton>
        <JournalItem
          title={data[0].title}
          text={data[0].text}
          data={data[0].date}
        />
      </CardButton>
      <CardButton>
        <JournalItem
          title={data[1].title}
          text={data[1].text}
          data={data[1].date}
        />
      </CardButton>
      <CardButton>
        <JournalItem
          title={data[2].title}
          text={data[2].text}
          data={data[2].date}
        />
      </CardButton>
    </>
  );
}

export default App;
