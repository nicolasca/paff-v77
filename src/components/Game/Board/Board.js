import React from 'react';
import styles from './Board.module.css';

class Board extends React.Component {

    onClick(id) {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
            this.props.events.endTurn();
        }
    }

    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    render() {
        const cellStyle = {
            border: '1px solid #555',
            width: '100px',
            height: '150px',
            textAlign: 'center',
        };

        let tbody = [];

        const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52]
        for (let i = 1; i < 55; i++) {
            if (spacePositions.includes(i)) {
                tbody.push(<div className="space"></div>);
            } else {
                tbody.push(<div style={cellStyle} key={i} onClick={() => this.onClick(i)}>
                    {this.props.G.cells[i]}
                </div>);
            }
        }


        return (
            <div>
                <div className={styles.Board}>
                    {tbody}
                </div>
            </div>
        );

    }
}

export default Board;