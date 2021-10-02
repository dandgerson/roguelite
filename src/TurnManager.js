class TurnManagerSingleton {
  constructor() {
    if (TurnManagerSingleton.instance) {
      console.warn('inappropriate instance of', TurnManagerSingleton.name)
      return TurnManagerSingleton.instance
    }

    TurnManagerSingleton.instance = this
  }

  #lastCall = Date.now()
  #interval = 150
  #entities = new Set()

  addEntity(entity) {
    this.#entities.add(entity)
  }

  removeEntity(entity) {
    this.#entities.remove(entity)
  }

  refresh() {
    this.#entities.forEach(e => e.refresh())
  }

  turn() {
    let now = Date.now()
    let limit = this.#lastCall + this.#interval

    if (now > limit) {
      for (let e of this.#entities) {
        if (!e.isOver()) {
          e.turn()
          break
        }
      }

      this.#lastCall = Date.now()
    }
  }

  isOver() {
    return [...this.#entities].every(e => e.isOver())
  }
}

export default TurnManagerSingleton
