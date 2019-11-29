import React, { FunctionComponent } from 'react';
import { IUnite } from '../../../../models/ICard';
import CardSelector from '../CardSelector/CardSelector';
import CardUnit from './CardUnit';

interface CardItemProps {
  card: IUnite;
}

const CardItem: FunctionComponent<CardItemProps> = (props) => {

  return (
      <React.Fragment>
        <CardUnit unit={props.card}></CardUnit>
        <CardSelector
          count={props.card.count || 0}
          name={props.card.nom}>
        </CardSelector>
      </React.Fragment>
  );
}

export default CardItem;
