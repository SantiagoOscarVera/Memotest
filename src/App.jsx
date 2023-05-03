import React from 'react'
import styles from './App.css'
import {useEffect, useState} from "react"
import Board from "./components/Board/Board.jsx"
import Swal from 'sweetalert2'
import { Button } from '@chakra-ui/react'

const emojiList = [..."🍕💣🥬🎩🌮🎱🌶🗡😜😪"]

const App = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [allBlocksFlipped, setAllBlocksFlipped] = useState(false); // nuevo estado booleano

  const resetGame = () => {
    setTimeLeft(60);
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
      Swal.fire({
        title: '¿Por qué tan elegante Homero? <br> - Porque este usuario ganó muchacho!',
        text: '¡Felicidades, ganaste, esa memoria todavia esta aceitada!',
        imageUrl: 'https://scontent.fcor10-3.fna.fbcdn.net/v/t1.6435-9/97563815_3116729948386940_6774695505050992640_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeF9XgY050R9ZjQJcXjD2ox_0s9fHrxZmdjSz18evFmZ2DC8fK862-k4aWBUMF0ABJ4WO65MjfXHWcFIzvJ-6FVF&_nc_ohc=0NI0jMx5ylwAX8pFuyj&_nc_ht=scontent.fcor10-3.fna&oh=00_AfDV6Zyb1uWNJCVOGf2mQHjg22_6XDWGJpgu9VmCN9e8Vw&oe=64794191',
        imageWidth: 1100,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
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
      
  <Button className="button-reiniciar" variant='outline' colorScheme='cyan' onClick={resetGame}>Volver a intentar</Button>
  
  {timerStarted ? (
    <div>
      <div className='tiempo'>Tiempo restante: {timeLeft} segundos</div>
    </div>
  ) : (
    <Button className="button-empezar" variant='outline' colorScheme='whatsapp' onClick={handleStartTimerClick}>Empezar a jugar</Button>
  )}
</div>

  <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} /> {/* // es el listado de bloques mezclados */}
</div>
  )
}

export default App
