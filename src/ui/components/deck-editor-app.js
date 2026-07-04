import {createCard} from '../../game/cards.js'
import {uuid} from '../../utils.js'
import {Card} from '../components/cards.js'
import {DeckEditor} from '../components/deck-editor.js'
import {DeckSelector} from '../components/deck-selector.js'
import {html, useState} from '../lib.js'

export function DeckEditorApp() {
	const [deck, setDeck] = useState(null)

	function createNewDeck() {
		setDeck({
			id: uuid(),
			name: `我的牌组 ${uuid()}`,
			custom: true,
		})
	}

	return html`
		<div class="Box">
			<h2>卡组编辑器</h2>
			<p>
				Slay the Boss 原福 自带一副经典的标准牌组。现在你也可以用现有的卡牌创建自己的牌组了。目前，自定义牌组仅保存在你自己的浏览器中。如果你觉得你的牌组值得分享给其他人，
				<a href="/manual">欢迎贡献</a>！
			</p>
			<ul class="Options">
				<li><button class="Button" onClick=${createNewDeck}>新建自定义牌组</button></li>
			</ul>
		</div>

		<div class="Box">
			<${DeckSelector} onSelectDeck=${setDeck} />
		</div>

		${
			deck?.custom
				? html`<${DeckEditor}
					deck=${deck}
					onSaveDeck=${setDeck}
					onDeleteDeck=${(deckId) => {
						if (deck?.id === deckId) setDeck(null)
					}}
				/>`
				: html`<${DeckPreview} deck=${deck} />`
		}
	`
}

function DeckPreview({deck}) {
	if (!deck) return html``

	return html`
		<div class="Box">
			<h3>${deck.name} <small>（内置牌组）</small></h3>
			<div class="Cards Cards--grid Cards--mini">
				${deck.cards.map((cardName) => html` <${Card} key=${cardName} card=${createCard(cardName)} /> `)}
			</div>
		</div>
	`
}
