import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Ripple from 'components/Ripples/index';

const Img = Ripple(
	<div>
		<img src="http://cdn01.weipaitang.com/img/20170820dNJhAFNqJhsMW57qE16wuSXkZVwSKd8OFdbzcUW2YpgLDg8U89hyQ2L-QsrvYPTb-W480H640/w/240" alt="error" />
	</div>
)
const Bannal = Ripple(
	[
		<button style={{ width: '7.5rem', height: '30px', backgroundColor: 'blue', border: 'none'}}>click me!</button>,
		<div style={{ width: '7.5rem', height: '50px', backgroundColor: '#777', color: '#fff' }}>ji in zo o</div>
	]
)
export default class TT extends React.Component {
	state = {
		list: [],
		num: 0,
	}
	handle = () => {
		this.setState({
			list: [
				...this.state.list,
				<div key={this.state.num}>
					<CSSTransition
						classNames={'qq'}
						timeout={1000}
					>
						<div>{this.state.num + 'yuiyuiyui'}</div>
					</CSSTransition>
				</div>
			],
			num: this.state.num + 1
		}, () => {
			setTimeout(() => {
				this.setState({
					list: this.state.list.slice(1)
				})
			}, 1000);
		})
	}
	render() {
		return (
			<div>
				<Img />
				<Bannal />
			</div>
		);
	}
}