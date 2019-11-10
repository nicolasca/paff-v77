import { Stage } from 'boardgame.io/core';

export const PHASES = {
    DRAFT: 'draft',
    INITIATIVE: 'initiative',
    DEPLOYMENT: 'deployment',
    PICK_ORDERS: 'pickOrders',
}


const PAFF = {
    name: 'PAFF',
    setup: () => ({
        decks: Array(2).fill(null),
        squares: Array(42).fill(null),
        initiativeScore: Array(2).fill(null),
        hands: Array(2).fill(null),
        orders: Array(2).fill(null),
    }),

    phases: {
        [PHASES.DRAFT]: {
            next: PHASES.INITIATIVE,
            start: true,
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            moves: {
                setDeck: (G, ctx, deck, playerID) => {

                    G.decks[playerID] = deck;
                    const hand = [];


                    deck.cartes.forEach((item) => {
                        for (let number = 0; number < item.nbExemplaires; number++) {
                            hand.push(item.carte);
                        }
                    });

                    G.hands[playerID] = hand;
                },
            },
            onEnd: (G, ctx) => {

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
                drop: (G, ctx, options) => {

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
            },
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            endIf: (G) => {
                console.log(G.hands[0].length === 0 && G.hands[1].length === 0);

                return G.hands[0].length === 0 && G.hands[1].length === 0;
            },
            next: PHASES.PICK_ORDERS,
        },
        [PHASES.PICK_ORDERS]: {

            // next: 'set_the_orders'
        },
        // set_the_orders: { next: 'use_the_orders' },
        // use_the_orders: { next: 'fight' },
        // fight: { next: 'pick_used_cards' },
    }
}

export default PAFF;