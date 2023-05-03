import React from 'react'
import styles from './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board.jsx"
import Swal from 'sweetalert2'

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡😜😪"]

const App = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [allBlocksFlipped, setAllBlocksFlipped] = useState(false); // nuevo estado booleano

  const resetGame = () => {
    setTimeLeft(10);
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
    setSelectedMemoBlock(null);
    setAnimating(false);
    setTimerStarted(false);
    setAllBlocksFlipped(false); // reiniciar el estado booleano
  };

  useEffect(() => { // apenas se recarga el componente, se usa la funcion resetear que hace que me cargue el board, se reinicie el temporizador y se vuelvan a mezclar los bloques
    resetGame();
  }, []);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return timer;
  };

  useEffect(() => {
    let timer;
    if (timerStarted) {
      timer = startTimer();
    }
    if (timeLeft === 0) {
      clearInterval(timer);
      Swal.fire({
        title: '¡Perdiste 😥!',
        text: 'Culpa tuya el perrito está en apuros, vuelve a intentarlo 🚑',
        imageUrl: 'https://i.pinimg.com/originals/cd/6f/f5/cd6ff5b067afaeba0e4d5535f1bc0a87.jpg',
        imageWidth: 400,
        imageHeight: 350,
        imageAlt: 'Custom image',
      })
    }

    // Verificar si todos los bloques están volteados
    const allBlocksFlipped = shuffledMemoBlocks.every((block) => block.flipped);
    setAllBlocksFlipped(allBlocksFlipped); // establecer el estado booleano

    // Mostrar mensaje "Ganaste" si todos los bloques están volteados y si el temporizador llegó a los 50 segundos
    if (allBlocksFlipped && timeLeft <= 50) {
      clearInterval(timer);
      alert("Ganaste");
    }

    return () => clearInterval(timer);
  }, [timeLeft, timerStarted, shuffledMemoBlocks]);

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleStartTimerClick = () => {
    setTimerStarted(true); // establecer timerStarted en true cuando se hace clic en el botón
  };

  const handleMemoClick = (memoBlock) => {

    if (!timerStarted) { // agregar condición para verificar si el temporizador ha comenzado
      return;
    }

    if (timeLeft === 0) {
      return;
    }

    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    } 
  };

  return (
    <div>
      
      <div className="button-container">
  <button className={styles.botones} onClick={resetGame}>Reiniciar</button>
  
  {timerStarted ? (
    <div>
      <div>Tiempo restante: {timeLeft} segundos</div>
    </div>
  ) : (
    <button className={styles.botones} onClick={handleStartTimerClick}>Empezar el conteo</button>
  )}
</div>

  <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} /> {/* // es el listado de bloques mezclados */}
</div>
  )
}

export default App
