import React from "react";
import styles from "./Reserve.module.scss";

function Reserve(props) {
  return (
    <React.Fragment>
      <div className={styles.Reserve}>
        <div className={`${styles.Hand} `}>{props.topHand}</div>

        <div className={`${styles.Other}`}>
          Votre adversaire a {props.bottomHand.length} cartes dans sa réserve
        </div>
      </div>
      )
    </React.Fragment>
  );
}

export default Reserve;
