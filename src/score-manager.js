const ScoreManager = {
	handleDoubleClick(container) {
		this.putPoints(container)
		const playerNumber = container.dataset.player
		const totalCell = document.getElementById(`total-${playerNumber}`)
		totalCell.textContent = ScoreUtils.manageTotal(playerNumber)
		this.updateAllRanks()
	}
}

export { ScoreManager }
