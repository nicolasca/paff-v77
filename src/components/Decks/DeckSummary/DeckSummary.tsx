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
      if (props.cards[key].count > 0) {
        nbCards += props.cards[key].count;
        // Calculer les points de deploiement (cout carte * nb) si unité
        if (props.cards[key].type !== 'ordre')
          deployment_points += props.cards[key].deploy * props.cards[key].count;

        return (
          <div key={index} className={[styles.Card, styles[props.cards[key].type]].join(' ')}>
            {key} x{props.cards[key].count}
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