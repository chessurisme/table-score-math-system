function addPlayer() {
	const main = document.querySelector('main')
	const fragment = new DocumentFragment()
	const playerId = gameState.nextPlayerId
	l
	fragment.appendChild(CellFactory.createPlayerNameCell(playerId))

	Object.entries(GameConfig.SCORES).forEach(([key, value]) => {
		for (let index = 0; index < value; index++) {
			fragment.appendChild(CellFactory.createScoreCell(key, index, playerId))
		}
	})

	fragment.appendChild(CellFactory.createTotalCell(playerId))
	fragment.appendChild(CellFactory.createRankCell(playerId))

	main.appendChild(fragment)
	ScoreManager.updateAllRanks()
}

export { addPlayer }
