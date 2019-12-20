import React from 'react';
import CardInGame from './../../CardInGame/CardInGame';
import SquareDrop from './../Square/SquareDrop';
import styles from './Battleground.module.scss';


function Battleground(props) {

  const renderSquare = (idLine, squareId, className) => {

    return (
      <SquareDrop
        G={props.G}
        key={idLine + '_' + squareId}
        className={className}
        square={squareId}
        moveCard={(item) => props.onDrop(item, squareId)}>
        {
          props.G.squares[squareId] ?
              <CardInGame
                playerID={props.playerID}
                unit={props.G.squares[squareId]}
                previousSquareId={squareId}
                moves={props.moves}>
              </CardInGame>
            : null
        }
      </SquareDrop>
    );
  }

  let rows = [];
  let squareId = 1;

  // Construct 6 layers with each:
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

    tbody.push(<div key={(i+1)} className={styles.Space}></div>);

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'NotLeft'));
    squareId += 1;

    rows.push(tbody);
  }

  const battleground = rows.map((row, index) => {
    const className = (index === 2) ? styles.Line + ' ' + styles.F1 : styles.Line;
    return (<div key={'key_' + index} className={className}>
      {row}
    </div>);
  });

  return (
    <div className={styles.Battleground}>
      {battleground}
    </div>
  );
}

export default Battleground;