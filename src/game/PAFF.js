import { Stage } from "boardgame.io/core";

export const PHASES = {
  CREATE: "create",
  DRAFT: "draft",
  INITIATIVE: "initiative",
  DEPLOYMENT: "deployment",
  FIGHT: "fight"
};

const drop = (G, ctx, options) => {
  // Remove from previous square
  if (options.previousSquareId) {
    G.squares[options.previousSquareId] = null;
  }

  // Remove from hand if exists
  const hand = G.hands[ctx.playerID].filter(card => {
    return card.gameCardId !== options.card.gameCardId;
  });

  G.hands[ctx.playerID] = hand;
  G.squares[options.squareId] = options.card;

  if (ctx.phase === PHASES.DEPLOYMENT) {
    G.deploymentPoints[ctx.playerID] =
      G.deploymentPoints[ctx.playerID] + options.card.deploy;
  }
};

const PAFF = {
  name: "PAFF",
  numPlayers: 2,
  setup: ctx => ({
    decks: Array(2).fill(null),
    squares: Array(42).fill(null),
    initiativeScore: Array(2).fill(null),
    hands: Array(2).fill(null),
    deploymentPoints: Array(2).fill(0),
    victoryPoints: Array(2).fill(0)
  }),
  phases: {
    [PHASES.DRAFT]: {
      start: true,
      next: PHASES.INITIATIVE,
      turn: {
        activePlayers: { all: Stage.NULL }
      },
      moves: {
        setDeck: (G, ctx, deck, playerID) => {
          G.decks[playerID] = deck;

          const hand = [];

          for (
            let itemNumber = 0;
            itemNumber < deck.cartes.length;
            itemNumber++
          ) {
            const item = deck.cartes[itemNumber];
            for (let number = 0; number < item.nbExemplaires; number++) {
              const cardCopy = { ...item.carte };
              let carteGameId = `${itemNumber}-${number}`;
              cardCopy["gameCardId"] = carteGameId;
              hand.push(cardCopy);
            }
          }
          G.hands[playerID] = hand;
        }
      },
      endIf: G => G.decks.every(i => i !== null)
    },
    [PHASES.INITIATIVE]: {
      moves: {
        rollDice: (G, ctx, playerID) => {
          G.initiativeScore[playerID] = ctx.random.Die(100);
        }
      },
      onBegin: (G, ctx) => {
        G.initiativeScore = Array(2).fill(null);
      },
      turn: {
        activePlayers: { all: Stage.NULL }
      },
      next: PHASES.DEPLOYMENT
    },
    [PHASES.DEPLOYMENT]: {
      moves: {
        drop: drop
      },
      turn: {
        activePlayers: { all: Stage.NULL }
      },
      next: PHASES.FIGHT
    },
    [PHASES.FIGHT]: {
      moves: {
        changeScoreVictory: (G, ctx, playerID, newValue) => {
          G.victoryPoints[playerID] = newValue;
        },
        drop: drop,
        changeRegimentNumber: (G, ctx, squareId, action) => {
          G.squares.forEach((card, index) => {
            if (index === squareId) {
              switch (action) {
                case "+":
                  card.regiment = card.regiment + 1;
                  break;
                case "-":
                  card.regiment = card.regiment - 1;
                  break;
                default:
                  break;
              }
            }
          });
        },
        removeCardFromBoard: (G, ctx, options) => {
          // Add victory points for the other player
          console.log(ctx.playerID);

          const player = +ctx.playerID === 1 ? 0 : 1;
          console.log(player);

          G.victoryPoints[player] =
            +G.victoryPoints[player] +
            +G.squares[options.previousSquareId].deploy;

          // Remove from previous square
          if (options.previousSquareId) {
            G.squares[options.previousSquareId] = null;
          }
        }
      },
      turn: {
        activePlayers: { all: Stage.NULL }
      }
    }
  }
};

export default PAFF;
