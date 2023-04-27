import React from 'react'
import './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board"

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡"]

App = () => {
const [shuffleMemoBlocks, setShuffleMemoBlocks] = useState([])

useEffect(() => {
const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList])
}, [])

const shuffleArray = a => {
  for (let i = a.length -1; i > 0; i-- ){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

}

export default App
