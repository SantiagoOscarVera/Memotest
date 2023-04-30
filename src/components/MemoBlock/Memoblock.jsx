import React from 'react';
import styles from "./MemoBlock.module.css"

const MemoBlock = ({animating, handleMemoClick, memoBlock}) => (
    <div className={styles["memo-block"]} onClick={()=>(!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)} >
        <div className={`${styles["memo-block-inner"]} ${memoBlock.flipped && styles["memo-block-flipped"]}`}>
            <div className={styles["memo-block-front"]}>
        
            </div>
            <div className={styles["memo-block-back"]}>
                {memoBlock.emoji}
            </div>
        </div>
    </div>
);

export default MemoBlock;
