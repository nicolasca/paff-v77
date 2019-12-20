/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { FlatFile, Server } from 'boardgame.io/dist/server';
// const PAFF = require('./src/game').PAFF;
import PAFF from './game/PAFF';

console.log('Run server boardgame js');

const PORT = process.env.PORT || 8000;
const server = Server({
  games: [PAFF],
  db: new FlatFile({
    dir: './storage/directory',
    logging: true,
  }),
});

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
