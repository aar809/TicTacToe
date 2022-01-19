import logo from './logo.svg';
import './App.css';
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import Tictactoe from "./Tictactoe"


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
  //TTT States
  const [numbers,setNumbers] = React.useState(allNewNumbers())
  const [turn, setTurn] = React.useState("X")
  const [win, setWin] = React.useState(false)

  // TTT function
  function nextTurn(id) {
    setTurn(prevValue => prevValue=="X" ? "O" : "X")
    // console.log(turn)
    setNumbers(oldNumbers => oldNumbers.map(x => {
      return x.id === id ? 
          {...x, value: turn} :
          x
      }))
    }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }   
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {         // Reduce the # here for testing purpose
        newDice.push(generateNewDie())
    }
    return newDice
  }

  //TTT function
  function generateNewNumber() {
    return {
        // value: Math.ceil(Math.random() * 9),
        value: "_",
        isClicked: false,
        id: nanoid()
    }
  }   

  //TTT function
  function allNewNumbers() {
    const newNumbers=[]

    for (let i=0; i<9; i++){
      newNumbers.push(generateNewNumber())
    }
    return newNumbers
  }


  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
    />
  ))

  // TTT function
  const numberElements = numbers.map(x => (
    <Tictactoe
      number = {x.value}
      key = {x.id}
      nextTurn = {() => nextTurn(x.id)}
      current_turn = {turn}
      isClicked = {x.isClicked}
      // isClicked = {x.isClicked}
    />
  ))
  


  function checkWinningState(dice){
    const num = dice[0].value
    for (let i = 0; i< dice.length; i++){
        if (dice[i].value === num && dice[i].isHeld){
            continue
        } else{
            return false
        }
    }
    return true
    }
    
  React.useEffect(() => {
    console.log("Dice state changed")
    setTenzies(checkWinningState(dice))
  }, [dice])

  function checkWinningState2(numbers){
    //check horizontal rows
    if (numbers[0].value === numbers[1].value && numbers[1].value === numbers[2].value && numbers[0].value !== "_") {
      return numbers[0].value
    }
    if (numbers[3].value === numbers[4].value && numbers[3].value === numbers[5].value && numbers[3].value !== "_") {
      return numbers[3].value
    }
    if (numbers[6].value === numbers[7].value && numbers[6].value === numbers[8].value && numbers[6].value !== "_") {
      return numbers[6].value
    }

    //check vertical columns
    if (numbers[0].value === numbers[3].value && numbers[0].value === numbers[6].value && numbers[0].value !== "_") {
      return numbers[0].value
    }
    if (numbers[1].value === numbers[4].value && numbers[1].value === numbers[7].value && numbers[1].value !== "_") {
      return numbers[1].value
    }
    if (numbers[2].value === numbers[5].value && numbers[2].value === numbers[8].value && numbers[2].value !== "_") {
      return numbers[2].value
    }

    // check diagonals
    if (numbers[0].value === numbers[4].value && numbers[0].value === numbers[8].value && numbers[0].value !== "_") {
      return numbers[0].value
    }
    if (numbers[2].value === numbers[4].value && numbers[2].value === numbers[6].value && numbers[2].value !== "_") {
      return numbers[2].value
    }
  }



  React.useEffect(() => {
    console.log("Tic Tac Toe state changed")
    setWin(checkWinningState2(numbers))
    }, [numbers])


  return (
    <main className="App">
      {win && <Confetti />}
      {/* <div className="dice-container"> 
        {diceElements}
      </div> */}
      <h1 className="title">{win ? win +" wins!" : "Tic Tac Toe"}</h1>
      
      <p className="instructions">{!win ? "Instructions: Try to get 3 in a row!": "Yay! Refresh to play again!"}
      {!win && <h2>  It is <u>{turn}</u>'s turn.</h2>}</p>
      <div className= "tictactoe-container">
        {numberElements}
      </div>
      
      {/* <button 
        className="roll-dice" 
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button> */}

      <button
        onClick={nextTurn}  
      >
        Switch Turns
      </button>
    </main>
  );
}

export default App;
