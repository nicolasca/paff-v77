import { Stage } from 'boardgame.io/core';

export const PHASES = {
  CREATE: 'create',
  DRAFT: 'draft',
  INITIATIVE: 'initiative',
  DEPLOYMENT: 'deployment',
  CHOOSE_ORDERS: 'chooseOrders',
}

const drop = (G, ctx, options) => {
  // Remove from previous square
  if (options.previousSquareId) {
    G.squares[options.previousSquareId] = null;
  }

  // Remove from hand if exists
  const hand = G.hands[ctx.playerID].filter((card) => {
    return card.gameCardId !== options.card.gameCardId;
  });

  G.hands[ctx.playerID] = hand
  G.squares[options.squareId] = options.card;
}


const PAFF = {
  name: 'PAFF',
  setup: (ctx) => ({

    decks: Array(2).fill(null),
    squares: Array(42).fill(null),
    initiativeScore: Array(2).fill(null),
    hands: Array(2).fill(null),
    availableOrders: Array(2).fill(null),
    showOrders: Array(2).fill(false),
  }),

  phases: {
    [PHASES.DRAFT]: {
      start: true,
      next: PHASES.INITIATIVE,
      turn: {
        activePlayers: { all: Stage.NULL },
      },
      moves: {
        setDeck: (G, ctx, deck, playerID, orders) => {

          G.decks[playerID] = deck;
          G.availableOrders[playerID] = orders;

          const hand = [];

          for (let itemNumber = 0; itemNumber < deck.cartes.length; itemNumber++) {
            const item = deck.cartes[itemNumber];
            for (let number = 0; number < item.nbExemplaires; number++) {
              const cardCopy = { ...item.carte };
              let carteGameId = `${itemNumber}-${number}`;
              cardCopy['gameCardId'] = carteGameId;
              hand.push(cardCopy);
            }
          };
          G.hands[playerID] = hand;
        },
      },
      endIf: G => (G.decks.every(i => i !== null)),

    },
    [PHASES.INITIATIVE]: {
      moves: {
        rollDice: (G, ctx, playerID) => {
          G.initiativeScore[playerID] = ctx.random.Die(100);
        },
      },
      onBegin: (G, ctx) => {
        G.initiativeScore = Array(2).fill(null)
      },
      turn: {
        activePlayers: { all: Stage.NULL },
      },
      next: PHASES.DEPLOYMENT,

    },
    [PHASES.DEPLOYMENT]: {

      moves: {
        drop: drop,
      },
      turn: {
        activePlayers: { all: Stage.NULL },
      },
      next: PHASES.CHOOSE_ORDERS,
    },
    [PHASES.CHOOSE_ORDERS]: {
      moves: {
        drop: drop,
        hideShowOrders: (G, ctx) => {
          G.showOrders[ctx.playerID] = !G.showOrders[ctx.playerID];
        },
        changeRegimentNumber: (G, ctx, squareId, action) => {
          G.squares.forEach((card, index) => {
            if (index === squareId) {
              switch (action) {
                case '+':
                  card.regiment = card.regiment + 1;
                  break;
                case '-':
                  card.regiment = card.regiment - 1;
                  break;
                default:
                  break;
              }
            }
          });
        },
        removeCardFromBoard: (G, ctx, options) => {
          // Remove from previous square
          if (options.previousSquareId) {
            G.squares[options.previousSquareId] = null;
          }
        },
      },
      turn: {
        activePlayers: { all: Stage.NULL },
      },
      // next: 'set_the_orders'
    },
    // use_the_orders: { next: 'fight' },
    // fight: { next: 'pick_used_cards' },
  }
}


export default PAFF;