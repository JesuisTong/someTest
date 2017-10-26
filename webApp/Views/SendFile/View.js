import React from 'react';
import s from './index.less';

export default class Send extends React.Component {
	state = {
		imgList: [],
		class: '',
	}
	componentDidMount() {
		this.setState({
			imgList: JSON.parse(localStorage.getItem('imglist'))
		});
	}
	sendFile = () => {
		const fr = new FileReader();
		console.log(this.input.files);
		window.q = this.input.files;
		for (let i = 0; i < this.input.files.length; i++) {
			fr.readAsDataURL(this.input.files[i]);
			fr.onload = (e) => {
				this.setState({
					imgList: this.state.imgList.push(e.target.result),
				}, () => {
					localStorage.setItem('imglist', JSON.stringify(this.state.imgList));
				})
			}
		}
			// this.canvas.width = this.img.naturalWidth;
			// this.canvas.height = this.img.naturalHeight;
			// this.canvas.getContext('2d').drawImage(img,0,0);
			// this.canvas.toDataURL('image/png', 1);
		    // $('img').attr('src', e.target.result);
	}
	showImgs = () => (
		this.state.imgList ? this.state.imgList.map((img, index) => (
			<img src={img} alt="nf" key={index} />
		)) : ''
	)
	click = () => {
		this.setState({ class: s.round }, () => {
			setTimeout(() => {
				this.setState({ class: '' })
			}, 5000)
		})
	}
	render() {
		return [
			<input type="file" accept="image/*" onChange={this.sendFile} ref={(a) => {this.input = a;}} multiple />,
			// <canvas ref={(a) => {this.canvas = a;}} />,
			this.showImgs(),
			<div>
				<div className={`${s.cirle} ${this.state.class}`}>qwehaha</div>
				<button onClick={this.click}>button</button>
			</div>
		]
	}
}