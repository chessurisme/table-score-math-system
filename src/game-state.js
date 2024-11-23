class GameState {
	#playerCount

	constructor() {
		this.#playerCount = 1
	}

	get nextPlayerId() {
		return this.#playerCount++
	}

	get currentPlayerCount() {
		return this.#playerCount
	}
}

export { GameState }
