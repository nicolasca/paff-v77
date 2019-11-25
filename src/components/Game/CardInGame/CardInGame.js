import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import CardUnit from './../../Decks/DeckItem/CardUnit/CardUnit';
import { ItemTypes } from './../Drag/ItemTypes';
import styles from './CardInGame.module.scss';

function CardInGame(props) {

  const [cardHover, setCardHover] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, card: props.unit, previousSquareId: props.previousSquareId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const onRightClickHandler = (event) => {
    event.preventDefault();
    setCardHover(true);
  }

  const onMouseLeaveHandler = () => {
    setCardHover(false);
  }

  const onClickPlusHandler = () => {
    props.moves.changeRegimentNumber(props.previousSquareId, '+');
  }

  const onClickLessHandler = () => {
    props.moves.changeRegimentNumber(props.previousSquareId, '-');
  }

  const imageUrl = !props.unit.image ? require(`../../../assets/logo.jpg`) :
    require(`../../../assets/cartes/${props.unit.faction.slug}/${props.unit.image}`);

  return (
    <div
      className={[styles.CardUnit, styles.container, styles[props.unit.faction.slug]].join(' ')}
      onContextMenu={onRightClickHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div className={styles.name}>
        <span>{props.unit.nom}</span>
      </div>
      <div className={styles.Image} style={{ backgroundImage: `url(${imageUrl})` }} >
        <img src={imageUrl} alt="" />
      </div>
      <div className={styles.Regiment}>
        {props.unit.regiment}
      </div>
      <div className={styles.RegimentButtons}>
        <p onClick={onClickPlusHandler}>+</p>
        <p onClick={onClickLessHandler}>-</p>
      </div>

      {cardHover ?

        <div className={styles.CardHover}>
          <CardUnit unit={props.unit}>
          </CardUnit>
        </div>
        : null
      }
    </div >
  );
}

export default CardInGame;