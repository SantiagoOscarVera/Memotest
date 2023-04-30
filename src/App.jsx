import React from 'react'
import './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board.jsx"

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡😜😪"]

const App = () => {
const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([])
const [selectedMemoBlock, setSelectedMemoBlock] = useState(null) // guardar cual es el bloque seleccionado cuando hace click
const [animating, setAnimating] = useState(false) // para saber si todavia estamos haciendo la animacion para que el usuario no pueda hacer clik en el bloque cuando todavia se esta animando el coso anterios
const resetGame = () => { // Resetear la aplicacion
  setTimeLeft(60); // reiniciar el contador de tiempo
  const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
  setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i ) => ({index:i, emoji, flipped:false}) ));
  setSelectedMemoBlock(null);
  setAnimating(false);
};
const [timeLeft, setTimeLeft] = useState(60);


const startTimer = () => {
  const timer = setInterval(() => {
    setTimeLeft(prevTime => prevTime - 1);
  }, 1000);
  return timer;
};

useEffect(() => {
  const timer = startTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    alert("Game Over");
  }
  return () => clearInterval(timer);
}, [timeLeft]);

useEffect(() => {
const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]) // guardamos el array mezclado y se lo pasamos dos veces para que los emojis esten dos veces para que puedan encontrar las parejas
setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i ) => ({index:i, emoji, flipped:false}) )) // flipped indica que la carta empueza dada vuelta 
}, []) // el array de dependencias lo dejamos vacio para que se entienda que se ejecute una sola vez que el componente se renderice

const shuffleArray = a => { /// devuelve el array pero en posiciones aleatorias 
  for (let i = a.length -1; i > 0; i-- ){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

  const handleMemoClick = memoBlock => { 

    if (timeLeft === 0){
      return 
    }

    const flippedMemoBlock = {...memoBlock, flipped: true}; // seteamos el bloque que fue cliekeado pero el true hace que lo demos vuelta
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks] // hacemos copia de la lista de bloques
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock) // reemplazamos por el bloque seleccionado por el bloque dado vuelta con splice, pasamos el indice del elemento, uno, y el elemento que queremos poner en su lugar
    setShuffledMemoBlocks(shuffledMemoBlocksCopy) // seteamos el nuevo listado de bloques con el bloque dado vuelta
    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock) // cuando no hay bloque seleccionado es igual al bloque clickeado
    } else if (selectedMemoBlock.emoji === memoBlock.emoji){ //los bloques/emojis son iguales
      setSelectedMemoBlock(null) // dejamos todo igual apra que el usuario pueda seguir jugando 
    } else { // el usuario no acerto
      setAnimating(true)
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock); // reemplazamos los bloques por los mismos bloques dados vuelta
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy)
        setSelectedMemoBlock(null)
        setAnimating(false) // en false porque ya termino la animacion
      }, 1000)
    }
  }
  return (
    <div>
        <button onClick={resetGame}>Reiniciar</button>
        <div>Time Left: {timeLeft} seconds</div>
<Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} /> {/* // es el listado de bloques mezclados */}
    </div>
  )
}

export default App
