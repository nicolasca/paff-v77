import React from 'react';

function DeckSummary(props) {

  const cards = props.cards.map((card, index) => {
    return (
    <div key={index}>
      {card.name} {card.count}
    </div>
    )
  });


  return (
    <div>
      <h3>Deck Summary</h3>
      <div>
        {cards}
       </div> 
    </div>
    
  );
}

export default DeckSummary;