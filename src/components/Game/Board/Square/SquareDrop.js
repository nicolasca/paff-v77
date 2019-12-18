import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './../../Drag/ItemTypes';
import Square from './Square';

function SquareDrop(props) {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => props.moveCard(item),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  let backgroundColor = 'white';
  if (canDrop && isOver) {
    backgroundColor = '#D99A4E'
  }

  return (
    <div ref={drop} style={{ backgroundColor }}>
      <Square className={props.className}>{props.children}</Square>
    </div >
  );
}

export default SquareDrop;