import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as Game } from '../../game/PAFF';
import { default as Board } from '../Game/Board/Board';
import './Lobby.css';

Game.minPlayers = 2;
Game.maxPlayers = 2;

const hostname = window.location.hostname;
const importedGames = [
    { game: Game, board: Board },
];

const LobbyView = () => (
    <div style={{ padding: 50 }}>
        <Lobby
            gameServer={`http://${hostname}:8000`}
            lobbyServer={`http://${hostname}:8000`}
            gameComponents={importedGames}
        />
    </div>
);

export default LobbyView;