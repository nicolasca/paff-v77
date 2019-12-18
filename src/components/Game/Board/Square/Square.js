import React from 'react';
import styles from './Square.module.scss';

function Square(props) {



  return (
    <div className={styles[props.className] + ' ' + styles.Square}>
      {props.children}
    </div>
  )
}

export default Square;