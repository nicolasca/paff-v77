import React from "react";
import { PHASES } from "../../../../game/PAFF";
import ReserveButton from "../Reserve/ReserveButton";
import BlackHole from "./BlackHole/BlackHole";
import styles from "./GameInformation.module.scss";

function GameInformation({
  G,
  ctx,
  events,
  moves,
  player0,
  player1,
  onClickReserveHandler,
  deploymentPoints,
  playerID
}) {
  const endDeploymentHandler = () => {
    events.endPhase();
  };
  const onRemoveCardHandler = item => {
    moves.removeCardFromBoard({
      card: item.card,
      previousSquareId: item.previousSquareId
    });
  };

  return (
    <div className={styles.GameInformation}>
      <div className={styles.Players}>
        <Player
          playerName={player0.name}
          playerNumber={0}
          factionName={G.decks[0].cartes[0].carte.faction.nom}
          moves={moves}
          commandPoints={G.commandPoints[0]}
          victoryPoints={G.victoryPoints[0]}
          playerID={playerID}
        ></Player>

        <Player
          playerName={player1.name}
          playerNumber={1}
          factionName={G.decks[1].cartes[0].carte.faction.nom}
          moves={moves}
          commandPoints={G.commandPoints[1]}
          victoryPoints={G.victoryPoints[1]}
          playerID={playerID}
        ></Player>
      </div>

      {playerID ? (
        <>
          {ctx.phase === PHASES.DEPLOYMENT ? (
            <div className={styles.Deployment}>
              <div>
                <span> Pts de déploiement de {player0.name}: </span>{" "}
                <span>{deploymentPoints[0]}</span>
              </div>
              <div>
                <span> Pts de déploiement de {player1.name}: </span>{" "}
                <span>{deploymentPoints[1]}</span>
              </div>
              <div className={styles.EndDeployment}>
                <button className="button" onClick={endDeploymentHandler}>
                  Valider le déploiement
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.BlackHoleReserve}>
                <BlackHole
                  removeCardFromBoard={item => onRemoveCardHandler(item)}
                ></BlackHole>
                <div></div>

                {ctx.phase === PHASES.FIGHT ? (
                  <ReserveButton
                    onClickReserve={onClickReserveHandler}
                  ></ReserveButton>
                ) : null}
              </div>

              <div className={styles.CommanderTable}>
                <table className="table is-striped">
                  <thead>
                    <tr>
                      <th>PC</th>
                      <th>Ordres</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mouvement</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Défense (-1 Att, pas de tir, +1 Def Tir et Cac)</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Assaut (+1 Att, -1 Def Tir et Cac)</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Tir</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Tir Artillerie</td>
                    </tr>
                    <tr>
                      <td>*</td>
                      <td>Renforts, * points de recrutement</td>
                    </tr>
                    <tr>
                      <td>**</td>
                      <td>Ordre de faction (** varie selon la faction)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

export default GameInformation;

export const Player = ({
  playerName,
  factionName,
  victoryPoints,
  commandPoints,
  moves,
  playerNumber
}) => {
  function onChangeScoreHandler(playerNumber, event) {
    moves.changeScoreVictory(playerNumber, event.target.value);
  }

  function onChangePCHandler(playerNumber, event) {
    moves.changePCPoints(playerNumber, event.target.value);
  }

  return (
    <div className={styles.Player}>
      <h2>{"J" + (playerNumber + 1)}</h2>
      <h4>
        {playerName} - {factionName}
      </h4>
      <p>Ordre: Transe divine</p>
      <p>
        PC:{" "}
        <input
          key={"commandPoints" + playerNumber}
          value={commandPoints}
          onChange={event => onChangePCHandler(playerNumber, event)}
          type="number"
        />
      </p>
      <p>
        Victoire:{" "}
        <input
          key={"victoryPoints" + playerNumber}
          value={victoryPoints}
          onChange={event => onChangeScoreHandler(playerNumber, event)}
          type="number"
        />
      </p>
    </div>
  );
};
