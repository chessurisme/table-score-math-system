'use strict';

class GameState {
	#playerCount

	constructor() {
		this.#playerCount = 1;
	}

	get nextPlayerId() {
		return this.#playerCount++
	}

	get currentPlayerCount() {
		return this.#playerCount
	}
}

const GameConfig = {
	SCORES: {
		2: 10,
		3: 5,
		5: 5
	},

	CELLS: 22,

	COLORS: {
		2: {
			light: '#f8f8ff',
			dark: '#595983'
		},
		3: {
			light: '#fff8f8',
			dark: '#e55555'
		},
		5: {
			light: '#f8fff8',
			dark: '#75b875'
		}
	},

	MEDALS: {
		1: {
			color: '#FFD700',
			textColor: 'black'
		},
		2: {
			color: '#C0C0C0',
			textColor: 'black'
		},
		3: {
			color: '#CD7F32',
			textColor: 'black'
		},
		default: {
			color: 'white',
			textColor: 'black'
		}
	}
};

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
		const cells = document.querySelectorAll(`[data-player="${playerNumber}"]`);
		const scores = Array.from(cells).map((cell) => parseInt(cell.dataset.points, 10));
		return this.calculateTotal(scores)
	}
};

const ScoreManager = {
	handleDoubleClick(container) {
		this.putPoints(container);
		const playerNumber = container.dataset.player;
		const totalCell = document.getElementById(`total-${playerNumber}`);
		totalCell.textContent = ScoreUtils.manageTotal(playerNumber);
		this.updateAllRanks();
	},

	putPoints(container) {
		const dataStorePoints = parseInt(container.dataset.storePoints, 10);
		const colors = GameConfig.COLORS[dataStorePoints];

		if (parseInt(container.dataset.points, 10) === 0) {
			container.dataset.points = dataStorePoints;
			container.style.backgroundColor = colors.dark;
			container.style.color = 'white';
			container.textContent = '✓';
		} else {
			container.dataset.points = 0;
			container.style.backgroundColor = colors.light;
			container.style.color = 'black';
			container.textContent = '';
		}
	},

	updateAllRanks() {
		const totalCells = Array.from(document.querySelectorAll('.total-cell'));
		const playerScores = totalCells.map((cell, index) => ({
			player: index + 1,
			score: parseInt(cell.textContent) || 0
		}));

		// Sort by score in descending order
		playerScores.sort((a, b) => b.score - a.score);

		// Assign ranks (handling ties)
		let currentRank = 1;
		let previousScore = null;

		playerScores.forEach((player, index) => {
			if (previousScore !== null && previousScore !== player.score) {
				currentRank = index + 1;
			}
			const rankCell = document.getElementById(`rank-${player.player}`);
			if (rankCell) {
				rankCell.textContent = currentRank;
				// Apply medal colors based on rank
				const medalStyle = GameConfig.MEDALS[currentRank] || GameConfig.MEDALS.default;
				rankCell.style.backgroundColor = medalStyle.color;
				rankCell.style.color = medalStyle.textColor;
			}
			previousScore = player.score;
		});
	}
};

const CellFactory = {
	createContainer() {
		return document.createElement('div')
	},

	createPlayerNameCell(playerId) {
		const container = this.createContainer();
		container.className = 'name-cell';
		container.id = `player-${playerId}-name`;
		container.contentEditable = true;
		return container
	},

	createScoreCell(score, index, playerId) {
		const container = this.createContainer();
		container.className = `score-cell score-${score}-cell`;
		container.id = `player-${playerId}-score-${score}-cell-${index}`;
		container.dataset.player = playerId;
		container.dataset.storePoints = score;
		container.dataset.points = 0;
		container.addEventListener('dblclick', () =>
			ScoreManager.handleDoubleClick.call(ScoreManager, container)
		);
		return container
	},

	createTotalCell(playerId) {
		const container = this.createContainer();
		container.className = 'total-cell';
		container.id = `total-${playerId}`;
		container.textContent = ScoreUtils.manageTotal(playerId) || 0;
		return container
	},

	createRankCell(playerId) {
		const container = this.createContainer();
		container.className = 'rank-cell';
		container.id = `rank-${playerId}`;
		container.textContent = '-';
		return container
	}
};

const gameState = new GameState();

function addPlayer() {
	const main = document.querySelector('main');
	const fragment = new DocumentFragment();
	const playerId = gameState.nextPlayerId;
	fragment.appendChild(CellFactory.createPlayerNameCell(playerId));

	Object.entries(GameConfig.SCORES).forEach(([key, value]) => {
		for (let index = 0; index < value; index++) {
			fragment.appendChild(CellFactory.createScoreCell(key, index, playerId));
		}
	});

	fragment.appendChild(CellFactory.createTotalCell(playerId));
	fragment.appendChild(CellFactory.createRankCell(playerId));

	main.appendChild(fragment);
	ScoreManager.updateAllRanks();
}

document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('addPlayer');

	button.addEventListener('click', () => {
		addPlayer();
	});
});
