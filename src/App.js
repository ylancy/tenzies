import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Dic from './components/dic';
import './App.css';

function App() {

  const randomNumber = () => {
    return Math.ceil(Math.random() * 6)
  }

  const newDice = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDice = {
        value: randomNumber(),
        held: false,
        id: i
      }
      newArray.push(newDice)
    }
    return newArray
  }

  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(dic => dic.held);
    const firstValue = dice[0].value;
    const allSame = dice.every(dic => dic.value === firstValue);
    if (allHeld && allSame) {
      setTenzies(true)
    }
  }, [dice])

  const rollHandler = () => {
    !tenzies ?
      setDice(pres => pres.map(pre => pre.held ? pre : { ...pre, value: randomNumber() }))
      :
      setDice(newDice())
    setTenzies(false)
  }

  const clickHandler = (id) => {
    setDice(pres => pres.map(pre => pre.id === id ? { ...pre, held: !pre.held } : pre))
  }

  const diceLists = dice.map(dic => <Dic key={dic.id} clickHandler={() => clickHandler(dic.id)} dic={dic} />)

  return (
    <div className="app-container">
      {tenzies && <Confetti />}
      <div className='title'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      </div>
      <div className='dice-container'> {diceLists}</div>
      <button className="roll-dice" onClick={rollHandler}>{tenzies ? 'Reset Game' : 'Roll'}</button>
    </div>
  );
}

export default App;
