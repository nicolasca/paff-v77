/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Server, FlatFile } from 'boardgame.io/dist/server';
// const PAFF = require('./src/game').PAFF;
import PAFF from './game/PAFF';


const PORT = process.env.PORT || 8000;
const server = Server({
  games: [PAFF],
  db: new FlatFile({
    dir: './storage/directory',
    logging: true,
  }),
});
console.log(server);

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
