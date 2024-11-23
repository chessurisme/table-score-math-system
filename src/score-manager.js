const ScoreManager = {
	handleDoubleClick(container) {
		this.putPoints(container)
		const playerNumber = container.dataset.player
		const totalCell = document.getElementById(`total-${playerNumber}`)
		totalCell.textContent = ScoreUtils.manageTotal(playerNumber)
		this.updateAllRanks()
	},

	putPoints(container) {
		const dataStorePoints = parseInt(container.dataset.storePoints, 10)
		const colors = GameConfig.COLORS[dataStorePoints]

		if (parseInt(container.dataset.points, 10) === 0) {
			container.dataset.points = dataStorePoints
			container.style.backgroundColor = colors.dark
			container.style.color = 'white'
			container.textContent = '✓'
		} else {
			container.dataset.points = 0
			container.style.backgroundColor = colors.light
			container.style.color = 'black'
			container.textContent = ''
		}
	}
}

export { ScoreManager }
