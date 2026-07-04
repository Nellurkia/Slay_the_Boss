import {html} from '../lib.js'

const WinScreen = (props) => html`
	<article class="Splash Container">
		<header class="Header">
			<h1>干得漂亮，你赢了。</h1>
		</header>
		<div class="Box">
			<ul class="Options">
				<li>
					<button class="Button" autofocus onClick=${props.onNewGame}>再来一局</a>
				</li>
			</ul>
		</div>
	</article>
`

export default WinScreen
