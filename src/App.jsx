import React from 'react'
import './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board"

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡"]

App = () => {
const [shuffleMemoBlocks, setShuffleMemoBlocks] = useState([])

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
  return <Board memoBlocks={shuffleMemoBlocks} />

}

export default App
