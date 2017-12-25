import React from 'react';
import domtoimage from 'dom-to-image';
import s from './index.less';

export default class Image3D extends React.Component {
  state = {
    hide: '',
  }
  componentDidMount() {
    // window.setTimeout(() => {
    //   domtoimage
    //     .toPng(this.img)
    //     .then((url) => {
    //       const img = new Image();
    //       img.src = url;
    //       this.setState({
    //         hide: img
    //       })
    //     })
    //     .catch(console.log);
    // }, 2000);
    this.canvas.width = this.img.style.width;
    this.canvas.height = this.img.style.height;

  }
  render() {
    return [(
      <div
        ref={(a) => {
          this.img = a;
        }}
      >
        <img
          style={{ width: '7.5rem' }}
          src="http://cdn.weipaitang.com/res/img/myVerifyInvitationBg01.png?t=1"
          alt="1"
        />
        <img
          style={{ width: '7.5rem' }}
          src="http://cdn.weipaitang.com/res/img/myVerifyInvitationBg02.png?t=1"
          alt="1"
        />
        <img
          style={{ width: '7.5rem' }}
          src="http://cdn.weipaitang.com/res/img/myVerifyInvitationBg03.png?t=1"
          alt="1"
        />
      </div>
    ), <canvas ref={(a) => { this.canvas = a; }} style={{ border: '1px solid blue' }} />];
  }
}
