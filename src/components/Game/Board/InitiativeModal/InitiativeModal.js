import React from 'react';
import styles from './InitiativeModal.module.css';

function IntiativeModal(props) {

  const resultText = () => {
    const winner = props.score0 < props.score1 ? props.player0 : props.player1;
    const loser = props.score0 < props.score1 ? props.player1 : props.player0;
    return (
      winner + " soumet " + loser
    );
  }

  return (
    <div className={styles.Modal + " modal is-active"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className={styles.Title + " modal-card-title"}>Initiative</p>
        </header>
        <section className="modal-card-body">
          <div className={styles.InitiativeScore}>
            <div>{props.player0} - {props.score0}</div>
            <div>vs</div>
            <div>{props.player1} - {props.score1}</div>
          </div>

          {
            props.hasResult ?
              <div className={styles.Result}>
                {resultText()}
              </div>
              :
              <div className={styles.RollLife}>
                <button className="button" onClick={props.onRollDiceHandler}>
                  Roll the life !
                        </button>
              </div>
          }
        </section>
      </div>
    </div >
  )
}

export default IntiativeModal;