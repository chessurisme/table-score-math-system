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
	},

	updateAllRanks() {
		const totalCells = Array.from(document.querySelectorAll('.total-cell'))
		const playerScores = totalCells.map((cell, index) => ({
			player: index + 1,
			score: parseInt(cell.textContent) || 0
		}))

		// Sort by score in descending order
		playerScores.sort((a, b) => b.score - a.score)

		// Assign ranks (handling ties)
		let currentRank = 1
		let previousScore = null

		playerScores.forEach((player, index) => {
			if (previousScore !== null && previousScore !== player.score) {
				currentRank = index + 1
			}
			const rankCell = document.getElementById(`rank-${player.player}`)
			if (rankCell) {
				rankCell.textContent = currentRank
				// Apply medal colors based on rank
				const medalStyle = GameConfig.MEDALS[currentRank] || GameConfig.MEDALS.default
				rankCell.style.backgroundColor = medalStyle.color
				rankCell.style.color = medalStyle.textColor
			}
			previousScore = player.score
		})
	}
}

export { ScoreManager }
