import { Stage } from 'boardgame.io/core';

export const PHASES = {
    CREATE: 'create',
    DRAFT: 'draft',
    INITIATIVE: 'initiative',
    DEPLOYMENT: 'deployment',
    PICK_ORDERS: 'pickOrders',
}

const drop = (G, ctx, options) => {
    // Remove from previous square
    if (options.previousSquareId) {
        G.squares[options.previousSquareId] = null;
    }

    // Remove from hand if exists
    const hand = G.hands[ctx.playerID].filter((card) => {

        return card._id !== options.card._id;
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
                    deck.cartes.forEach((item) => {
                        for (let number = 0; number < item.nbExemplaires; number++) {
                            hand.push(item.carte);
                        }
                    });

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
            next: PHASES.PICK_ORDERS,
        },
        [PHASES.PICK_ORDERS]: {
            moves: {
                drop: drop,
            },
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            // next: 'set_the_orders'
        },
        // set_the_orders: { next: 'use_the_orders' },
        // use_the_orders: { next: 'fight' },
        // fight: { next: 'pick_used_cards' },
    }
}


export default PAFF;