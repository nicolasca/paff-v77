import PropTypes from 'prop-types';
import * as React from 'react';
import styles from './DeckSummary.module.css';

interface DeckSummaryProps {
  cards: any,
}

const DeckSummary: React.SFC<DeckSummaryProps> = (props) => {

  const [deploymentPoints, setDeploymentPoints] = React.useState(0);
  const [numberOfCards, setNumberOfCards] = React.useState(0);
  const [cardsJSX, setCardsJSX] =React.useState<(JSX.Element | null)[]>(null!);

  React.useEffect(() => {

    let deployment_points = 0;
    let nbCards = 0;
    const cards = Object.keys(props.cards).map((key, index) => {
      const card = props.cards[key];
      if (card.count > 0) {
        nbCards += card.count;
        // Calculer les points de deploiement (cout carte * nb) si unité
        if (card.unit.type !== 'ordre')
          deployment_points += card.unit.deploy * card.count;

        return (
          <div key={index} className={[styles.Card, styles[card.unit.type]].join(' ')}>
            {card.unit.name} x{card.count}
          </div>
        )
      }
      return null;
    });
    setDeploymentPoints(deployment_points);
    setNumberOfCards(nbCards);
    setCardsJSX(cards);
  }, [props.cards])


  return (
    <div>
      <div>Nombre de cartes: {numberOfCards}</div>
      <div className={styles.DeployPoints}>
        Points de déploiement: {deploymentPoints} pts
       </div>
      {cardsJSX}
    </div>

  );
}

export default DeckSummary;

DeckSummary.propTypes = {
  cards: PropTypes.object,
}