import { Stage } from 'boardgame.io/core';

export const PHASES = {
  CREATE: 'create',
  DRAFT: 'draft',
  INITIATIVE: 'initiative',
  DEPLOYMENT: 'deployment',
  CHOOSE_ORDERS: 'chooseOrders',
  APPLY_ORDERS: 'applyOrders',
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
  numPlayers: 2,
  setup: (ctx) => ({

    decks: Array(2).fill(null),
    squares: Array(42).fill(null),
    initiativeScore: Array(2).fill(null),
    hands: Array(2).fill(null),
    availableOrders: Array(2).fill(null),
    selectedOrdersProgs: Array(2).fill(null),
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
      onBegin: (G, ctx) => {
        G.selectedOrdersProgs[0] = null;
        G.selectedOrdersProgs[1] = null;
      },
      moves: {
        validateOrdersProgs: (G, ctx, ordersProgs) => {
          G.selectedOrdersProgs[ctx.playerID] = ordersProgs;
          console.log(ctx.playerID);

          const ordersToRemove = ordersProgs.map((orderProg) => orderProg.order._id);

          // Remove these orders from the pool
          // for (let i = 0; i < G.availableOrders[ctx.playerID].length; i++) {
          G.availableOrders[ctx.playerID].forEach((order) => {
            // const order = G.availableOrders[ctx.playerID][i];
            ordersToRemove.forEach((orderToRemove) => {

              if (order._id === orderToRemove && !order.recuperable) {
                order.limite = order.limite - 1;
              }
            });
          });

          if (G.selectedOrdersProgs[0] && G.selectedOrdersProgs[1]) {
            ctx.events.endPhase();
          }
        }
      },
      turn: {
        activePlayers: { all: Stage.NULL },
      },
      next: PHASES.APPLY_ORDERS,
    },
    [PHASES.APPLY_ORDERS]: {
      moves: {
        drop: drop,
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
      next: PHASES.CHOOSE_ORDERS,
    },
  }
}


export default PAFF;