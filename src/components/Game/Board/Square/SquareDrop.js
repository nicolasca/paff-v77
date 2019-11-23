import React from 'react';
import Square from './Square';
import { ItemTypes } from './../../Drag/ItemTypes';
import { useDrop } from 'react-dnd'

function SquareDrop(props) {

  // const [{ isOver, canDrop }, drop] = useDrop({
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
      <Square >{props.children}</Square>
    </div >
  );
}

export default SquareDrop;