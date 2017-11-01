import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { withStyles } from 'material-ui/styles';
// import green from 'material-ui/colors/green';
// import { FormGroup, FormControlLabel } from 'material-ui/Form';
// import { Checkbox } from 'material-ui';

import Ripple from 'components/Ripples/index';
import s from './css.less';

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
		show: false,
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
	// {...onTouchEnd(() => { this.setState({ show: !this.state.show }); })}
	render() {
		return (
			<div className={s.body}>
				<button onClick={() => { this.setState({ show: !this.state.show })}}>click it</button>
				<div style={{ fontSize: '50px', backgroundColor: this.state.show ? 'red' : 'blue' }} data-type>
					这里是一条内容
					<div data-type={Math.random() * 99}>哈哈</div>
				</div>
				<div className={`${s.outcoupon} ${s.disable} ${s.expire}`}>
					<div className={s.coupon}>
						<span className={`${s.couponHead} ${'条件' ? s.shop : s.platform}` }>
							<div className={s.price}>¥<span>9999</span></div>
							<div className={s.condition}>满任意金额李健</div>
						</span>
						<span className={s.couponBody}>
							<div className={s.cpt}>
								<button className={s['coupon-icon']}>平台圈</button>
								<span className={s['coupon-title']}>大三大四的</span>
							</div>
							<div className={s.cpb}>
								<span className={s.duration}>2016.01.01-2020.12.12</span>
								<span className={s['detail-btn']} >
									详情
									<i className="material-icons material-icons.md-24">
										keyboard arrow down
									</i>
								</span>
							</div>
						</span>
					</div>
					{
						!!this.state.show && <div className={s.info}>
							<span className={s.inf}>活动可用</span>
							<span className={s.inf}>玉翠珠宝分类可用</span>
							<span className={s.inf}>认证店铺可用</span>
							<span className={s.inf}>认证店铺可用</span>
						</div>
					}
				</div>
				<CSSTransition
					classNames="hei"
					timeout={300}
					appear={true}
					mountOnEnter={true}
					unmountOnExit={true}
					in={this.state.show}
				>	
					<div className={s.wry}>
						{'wryyyyyyyyyyyy'}
					</div>
				</CSSTransition>
			</div>
		);
	}
}