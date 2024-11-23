const ScoreUtils = {
	calculateTotal(array = []) {
		if (!Array.isArray(array)) {
			throw new Error('Input should be an array.')
		}

		return array.reduce((count, element) => {
			if (typeof element !== 'number') {
				throw new Error('Cannot total because some of the inputs are not a type of number.')
			}
			return count + element
		}, 0)
	},

	manageTotal(playerNumber) {
		const cells = document.querySelectorAll(`[data-player="${playerNumber}"]`)
		const scores = Array.from(cells).map((cell) => parseInt(cell.dataset.points, 10))
		return this.calculateTotal(scores)
	}
}
