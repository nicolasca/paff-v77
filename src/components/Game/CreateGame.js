import { Client } from 'boardgame.io/react';
import React, { Component } from 'react';
import Board from './Board/Board';
import Game from '../../game/PAFF';

class CreateGame extends Component {
    render() {
        const PAFF = Client({
            game: Game,
            board: Board,
            multiplayer: { local: true },
        });

        return (
            <div>
                <PAFF playerID="0" />
                <PAFF playerID="1" />
            </div>

        )
    }
}

export default CreateGame;





