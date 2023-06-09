import MemoBlock from "../MemoBlock/MemoBlock"
import styles from "./Board.module.css"
import React from 'react';

const Board = ({animating, handleMemoClick,  memoBlocks}) => {
    return (
        <main className={styles.board}>
            {memoBlocks.map((memoBlock, i ) => {
                return <MemoBlock key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} /> // psamos la key porque lo necesita react para renderizar elementos integrados, el index del map con el emoji nos da un identificador unico para cada bloque y le pasamos el memoblock con toda la informacion del bloque 
            })}
        </main>
    )
};

export default Board;