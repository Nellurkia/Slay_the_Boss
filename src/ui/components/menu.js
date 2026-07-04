import {html, useState} from '../lib.js'
import {saveToUrl} from '../save-load.js'
import {toggleMute} from '../sounds.js'

// @ts-expect-error
const abandonGame = () => {
	window.location.href = window.location.origin
}

/** @typedef {import('../../game/new-game.js').Game} Game */
/** @typedef {import('../../game/actions.js').State} State */

/**
 * Do something
 * @param {object} props
 * @param {State} props.gameState
 * @returns {import('preact').VNode}
 */
export default function Menu({gameState}) {
	const [muted, setMuted] = useState(false)

	function toggleSound() {
		toggleMute(!muted)
		setMuted(!muted)
	}

	return html`
		<div class="Container">
			<br />
			<br />
			<div class="Box">
				<ul class="Options">
					<li>
						<button
							class="Button"
							onClick=${() => saveToUrl(gameState)}
							title="存档将保存在网址中，请复制它"
						>
							保存游戏
						</button>
					</li>
					<li>
						<button class="Button" danger onClick=${() => abandonGame()}>放弃游戏</button>
					</li>
					<li>
						<label>音效 <input type="checkbox" checked=${!muted} onClick=${() => toggleSound()} /></label>
					</li>
				</ul>
			</div>
		</div>
	`
}
