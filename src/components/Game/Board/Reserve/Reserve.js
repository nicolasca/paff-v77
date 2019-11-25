import React from 'react';
import styles from './Reserve.module.scss';

function Reserve(props) {


  return (
    <React.Fragment>

      <div className={styles.Reserve}>
        <div className={`${styles.Hand} `} >
          {props.topHand}
        </div>

        <div className={`${styles.Hand}`} >
          {props.bottomHand}
        </div>
      </div>

      )
  }
        </React.Fragment>

  );
}

export default Reserve;