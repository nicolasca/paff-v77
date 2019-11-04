export const PHASES = {
    DRAFT: 'draft',
    DEPLOYMENT: 'deployment'
}


const PAFF = {
    name: 'PAFF',
    setup: () => ({
        decks: Array(2).fill(null),
        cells: Array(42).fill(null),
    }),

    moves: {
        clickCell: (G, ctx, id) => {
            G.cells[id] = ctx.currentPlayer;
        },
    },

    phases: {
        [PHASES.DRAFT]: {
            next: PHASES.DEPLOYMENT,
            start: true,
            turn: {
                moveLimit: 1,
            },
            moves: {
                setDeck: (G, ctx, deck, player) => {
                    G.decks[player] = deck;
                },
            },
            onBegin: (G, ctx) => {
                console.log('begin draft');
            },
            endIf: G => (G.decks.every(i => i !== null)),

        },
        [PHASES.DEPLOYMENT]: {
            onBegin: (G, ctx) => console.log('begin deployment')

            // next: 'pick_used_cards'
        },
        // pick_used_cards: { next: 'set_the_orders' },
        // set_the_orders: { next: 'use_the_orders' },
        // use_the_orders: { next: 'fight' },
        // fight: { next: 'pick_used_cards' },
    }
}

export default PAFF;