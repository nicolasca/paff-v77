import React from 'react';
import styles from './DeckSummary.module.css';
import PropTypes from 'prop-types';

function DeckSummary(props) {

  let pts_depl = 0;
  let nombreCartes = 0;
  const cards = Object.keys(props.cards).map((key, index) => {
    if (props.cards[key].count > 0) {
      nombreCartes += 1;
      // Calculer les points de deploiement (cout carte * nb) si unité
      if (props.cards[key].type !== 'ordre')
        pts_depl += props.cards[key].deploy * props.cards[key].count;

      return (
        <div key={index} className={[styles.Card, styles[props.cards[key].type]].join(' ')}>
          {key} x{props.cards[key].count}
        </div>
      )
    }
    return null;
  });

  return (
    <div>
      <div>Nombre de cartes: {nombreCartes}</div>
      <div className={styles.DeployPoints}>
        Points de déploiement: {pts_depl} pts
       </div>
      {cards}
    </div>

  );
}

export default DeckSummary;

DeckSummary.propTypes = {
  cards: PropTypes.object,
}