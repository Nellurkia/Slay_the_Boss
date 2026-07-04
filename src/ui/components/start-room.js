import {Component, html} from '../lib.js'

export default class StartRoom extends Component {
	render() {
		return html`
			<div class="Container Container--center">
				<div class="Box">
				<h1 center style="color: black">你重生了……</h1>
				<p center>摆脱被锤命运，穿越黑心公司，并击败最终BOSS。</p>
					<ul class="Options">
						<li><button class="Button" onClick=${() => this.props.onContinue()}>打开地图</button></li>
					</ul>
				</div>
			</div>
		`
	}
}
