import { Client } from 'boardgame.io/react';
import React, { Component } from 'react';
import Board from './Board/Board';
import Game from '../../game/PAFF';
import { connect } from 'react-redux';
import logger from 'redux-logger';

class CreateGame extends Component {
    render() {
        const PAFF = Client({
            game: Game,
            board: Board,
            multiplayer: { server: 'localhost:8000' },
            debug: true,
            enhancer: applyMiddleware(logger),
        });

        return (
            <div >
                <PAFF playerID="0" />
                <PAFF playerID="1" />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.authReducer.username,
    }
};

export default connect(mapStateToProps)(CreateGame);







