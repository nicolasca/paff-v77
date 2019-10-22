/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {
    Server
} from 'boardgame.io/server';
// const PAFF = require('./src/game').PAFF;
import PAFF from './src/game/PAFF';


const PORT = process.env.PORT || 8000;
const server = Server({
    games: [PAFF]
});
console.log(server);

server.run(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`);
});

// const Server = require('boardgame.io/server').Server;
// const PAFF = require('./src/game').PAFF;
// const server = Server({
//     games: [PAFF]
// });
// server.run(8000);