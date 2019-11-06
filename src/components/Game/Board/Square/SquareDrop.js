import React from 'react';
import Square from './Square';
import { ItemTypes } from './../../Drag/ItemTypes';
import { moveCard } from './../../Drag/Game';
import { useDrop } from 'react-dnd'

function SquareDrop(props) {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => props.moveCard(item),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })


  return (
    <div
    ref={drop}
    >
    <Square >{props.children}</Square>
    </div>
  );
}

export default SquareDrop;