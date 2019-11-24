import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../Drag/ItemTypes';

function BlackHole(props) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item) => props.removeCardFromBoard(item),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop(),
        }),
    });

    let styles = {
        width: '100px',
        height: '125px',
        // height: '100%',
    }

    let backgroundColor = 'black';
    if (canDrop && isOver) {
        backgroundColor = 'grey';
    }

    styles = { ...styles, backgroundColor };
    console.log(styles);


    return (
        <div ref={drop} style={styles}>

        </div >
    );
}

export default BlackHole;