import React from 'react';
import CardInGame from './../../CardInGame/CardInGame';
import SquareDrop from './../Square/SquareDrop';
import styles from './Battleground.module.scss';


function Battleground(props) {

  const renderSquare = (i, squareId) => {

    return (
      <SquareDrop
        G={props.G}
        ctx={props.ctx}
        key={i}
        square={squareId}
        moveCard={(item) => props.onDrop(item, squareId)}>
        {
          props.G.squares[squareId] ?
            <div className={styles.Card}>
              <CardInGame
                playerID={props.playerID}
                unit={props.G.squares[squareId]}
                previousSquareId={squareId}
                moves={props.moves}>
              </CardInGame>
            </div>
            : null
        }

      </SquareDrop>
    );
  }

  let tbody = [];
  const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];
  let squareId = 1;

  for (let i = 1; i < 55; i++) {
    if (spacePositions.includes(i)) {
      tbody.push(<div key={i} className="space"></div>);
    } else {

      tbody.push(renderSquare(i, squareId));
      squareId += 1;
    }
  }

  return (
    <div className={styles.Battleground}>
      {tbody}
    </div>
  );
}

export default Battleground;