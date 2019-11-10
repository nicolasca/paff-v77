let cardPosition = [1, 7]
let observers = []
function emitChange() {
  observers.forEach(o => o && o(cardPosition))
}

export function observe(o) {
  observers.push(o)
  emitChange()
  return () => {
    observers = observers.filter(t => t !== o)
  }
}

export function moveCard(toX, toY) {

  cardPosition = [toX, toY]
  emitChange()
}