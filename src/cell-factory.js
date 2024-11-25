import { ScoreUtils } from './score-utils'
import { ScoreManager } from './score-manager'

const CellFactory = {
	createContainer() {
		return document.createElement('div')
	},

	createPlayerNameCell(playerId) {
		const container = this.createContainer()
		container.className = 'name-cell'
		container.id = `player-${playerId}-name`
		container.contentEditable = true
		return container
	},

	createScoreCell(score, index, playerId) {
		const container = this.createContainer()
		container.className = `score-cell score-${score}-cell`
		container.id = `player-${playerId}-score-${score}-cell-${index}`
		container.dataset.player = playerId
		container.dataset.storePoints = score
		container.dataset.points = 0
		let longPressTimeout
		container.addEventListener('touchstart', () => {
			longPressTimeout = setTimeout(() => {
				ScoreManager.handleDoubleClick.call(ScoreManager, container)
			}, 500)
		})
		container.addEventListener('touchend', () => clearTimeout(longPressTimeout))
		container.addEventListener('touchcancel', () => clearTimeout(longPressTimeout))
		container.addEventListener('dblclick', () =>
			ScoreManager.handleDoubleClick.call(ScoreManager, container)
		)
		return container
	},

	createTotalCell(playerId) {
		const container = this.createContainer()
		container.className = 'total-cell'
		container.id = `total-${playerId}`
		container.textContent = ScoreUtils.manageTotal(playerId) || 0
		return container
	},

	createRankCell(playerId) {
		const container = this.createContainer()
		container.className = 'rank-cell'
		container.id = `rank-${playerId}`
		container.textContent = '-'
		return container
	}
}

export { CellFactory }
