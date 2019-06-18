import React from 'react';

function DeckSummary(props) {

  let pts_depl = 0;
  const cards = Object.keys(props.cards).map((key, index) => { 
    if (props.cards[key].count > 0) {
      // Calculer les points de deploiement (cout carte * nb)
      pts_depl += props.cards[key].deploy * props.cards[key].count;
      return (
      <div key={index}>
        {key} x{props.cards[key].count}
      </div>
      )
    }
    return null;
  });

  return (
    <div>
      <h3>Le deck</h3>
      <div>
        Points de déploiement: {pts_depl} pts
       </div> 
       {cards}
    </div>
    
  );
}

export default DeckSummary;