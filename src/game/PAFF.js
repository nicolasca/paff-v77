const PAFF = {
    name: 'PAFF',
    setup: () => ({ cells: Array(42).fill(null) }),

    moves: {
        clickCell: (G, ctx, id) => {
            G.cells[id] = ctx.currentPlayer;
        },
    }
}

export default PAFF;