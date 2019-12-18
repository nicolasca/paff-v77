import React from 'react';
import CardInGame from './../../CardInGame/CardInGame';
import SquareDrop from './../Square/SquareDrop';
import styles from './Battleground.module.scss';


function Battleground(props) {

  const squaresWithLeftBorder = []

  const renderSquare = (i, squareId, className) => {

    return (
      <SquareDrop
        G={props.G}
        key={i}
        className={className}
        square={squareId}
        moveCard={(item) => props.onDrop(item, squareId)}>
        {
          props.G.squares[squareId] ?
            <div className={styles.Card}>
              <CardInGame
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

  let rows = [];
  const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];
  let squareId = 1;

  // Construct 6 layers with:
  // - zone with 2 squares
  // - space
  // - zone with 3 squares
  // - space
  // - zone with 2 squares

  for (let i = 1; i < 7; i++) {
    let tbody = [];

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'NotLeft'));
    squareId += 1;

    tbody.push(<div key={i} className={styles.Space}></div>);

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'None'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;

    tbody.push(<div key={i} className={styles.Space}></div>);

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'NotLeft'));
    squareId += 1;

    rows.push(tbody);
  }

  const battleground = rows.map((row, index) => {
    let element = (<div key={'key_' + index} className={styles.Line}>
      {row}
    </div>);
    if (index === 2) {
      element = (<div key={'key_' + index} className={styles.Line + ' ' + styles.F1}>
        {row}
      </div>);
    }

    return element;
  });

  return (
    <div className={styles.Battleground}>
      {battleground}
    </div>
  );
}

export default Battleground;