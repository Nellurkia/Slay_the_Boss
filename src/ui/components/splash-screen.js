import {getRuns} from '../../game/backend.js'
import {timeSince} from '../../utils.js'
import gsap from '../animations.js'
import {Component, html} from '../lib.js'
import {DeckSelector} from './deck-selector.js'

export default class SplashScreen extends Component {
	constructor() {
		super()
		this.state = {
			runs: [],
			selectedDeck: null,
			selectingDeck: false,
		}

		this.handleStartGame = this.handleStartGame.bind(this)
		this.startDeckSelection = this.startDeckSelection.bind(this)
	}

	componentDidMount() {
		gsap.from(this.base, {duration: 0.2, autoAlpha: 0, scale: 0.98})
		// @ts-expect-error
		gsap.to(this.base.querySelector('.Splash-spoder'), {delay: 5, x: 420, y: 60, duration: 3})
		getRuns().then(({runs}) => this.setState({runs}))
	}

	handleDeckSelected(deck) {
		this.setState({selectedDeck: deck}, () => {
			// Start game immediately when a deck is selected
			this.handleStartGame()
		})
	}

	startDeckSelection() {
		this.setState({selectingDeck: true})
	}

	handleStartGame() {
		this.props.onNewGame(this.state.selectedDeck)
	}

	render(_props, state) {
		const run = state.runs[0]

		if (state.selectingDeck) {
			return html`
				<article class="Splash Container Container--vcenter">
					<div class="Box">
						<ul class="Options">
							<li><button class="Button" onClick=${() => this.setState({selectingDeck: false})}>← 菜单</button></li>
						</ul>
						<br/>
						<h2>选择一副牌组</h2>
						<${DeckSelector} onSelectDeck=${(deck) => this.handleDeckSelected(deck)} />
						<ul class="Options">
							<li><hr /></li>
							<li><a class="Button" href="/deck-builder">卡组编辑器 →</a></li>
						</ul>
					</div>
				</article>
			`
		}

		return html`
			<article class="Splash Container Container--vcenter">
				<img class="Splash-spoder" src="/images/spoder.png" title="哦，你好" />
				<div class="Box">
					<h1 class="Title Splash-title">Slay the Boss</h1>
					<ul class="Options">
						${
							location.hash
								? html`
									<li>
										发现存档。<button class="Button" autofocus onClick=${this.props.onContinue}>继续？</button>
									</li>
									<li><button class="Button" onClick=${() => this.props.onNewGame()}>新游戏</button></li>
								`
								: html`
									<li><button class="Button primary" autofocus onClick=${() => this.props.onNewGame()}>开始游戏</button></li>
									<li><button class="Button" onClick=${this.startDeckSelection}>使用自定义牌组</button></li>
									<li><hr /></li>
									<li><a class="Button" href="/?debug&tutorial">教程</a></li>
									<li><a class="Button" href="/deck-builder">卡组编辑器</a></li>
								`
						}
						<li><a class="Button" href="/collection">卡牌图鉴</a></li>
						<li>
							<a class="Button" href="/stats"
								>排行榜
								${
									this.state.runs.length > 0 &&
									html` <a class="LastRun" href=${`/stats/run?id=${run.id}`}>
									${timeSince(run.createdAt)}，有人${run.won ? '获胜' : '落败'}
								</a>`
								}
							</a>
						</li>
						<li><a class="Button" href="/manual">说明书</a></li>
					</ul>
				</div>
			</article>
		`
	}
}
