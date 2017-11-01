import React from 'react';
// import { CSSTransition } from 'react-transition-group';
import s from './index.less';

export default class Music extends React.Component {
	state = {
		whirling: false,
	}
	time = 0;
	handleClick = () => {
		if (this.interval) {
			clearInterval(this.interval)
			this.interval = null;
			return;
		}
		this.interval = setInterval(() => {
			if (this.time === 360) {
				this.time = 0;
			} else {	
				this.time += 1;		
			}
			this.circle.style.transform = `rotate(${this.time}deg)`;
		}, 1000 / 60)
	}
	render() {
		const { whirling } = this.state;
		return (
			<div className={s.music}>
				<div
					className={s.circle}
					style={{ backgroundImage: 'url(/static/02d4fd8ea0ec08fa5a169d1453ee3d6d54fbda4c.jpg)' }}
					ref={(a) => {this.circle = a;}}
				/>
				<audio src="/static/1111.mp3" controls preload="matadata" />
				<button onClick={this.handleClick}>
					你又开始了？
				</button>
			</div>
		);
	}
}