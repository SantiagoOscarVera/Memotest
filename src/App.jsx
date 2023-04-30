import React from 'react'
import './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board.jsx"

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡"]

const App = () => {
const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([])
const [selectedMemoBlock, setSelectedMemoBlock] = useState(null) // guardar cual es el bloque seleccionado cuando hace click
const [animating, setAnimating] = useState(false) // para saber si todavia estamos haciendo la animacion para que el usuario no pueda hacer clik en el bloque cuando todavia se esta animando el coso anterios



useEffect(() => {
const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]) // guardamos el array mezclado y se lo pasamos dos veces para que los emojis esten dos veces para que puedan encontrar las parejas
setShuffleMemoBlocks(shuffledEmojiList.map( (emoji, i ) => ({index:i, emoji, flipped:false}) )) // flipped indica que la carta empueza dada vuelta 
}, []) // el array de dependencias lo dejamos vacio para que se entienda que se ejecute una sola vez que el componente se renderice

const shuffleArray = a => { /// devuelve el array pero en posiciones aleatorias 
  for (let i = a.length -1; i > 0; i-- ){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

  const handleMemoClick = memoBlock => { 
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
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy)
        setSelectedMemoBlock(null)
        setAnimating(false)
      }, 1000)
    }
  }
  return (
    <Board memoBlocks={shuffledMemoBlocks} /> // es el listado de bloques mezclados
  )
}

export default App
