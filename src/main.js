import { addPlayer } from './add-player'

document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('addPlayer')

	button.addEventListener('click', () => {
		addPlayer()
	})
})
