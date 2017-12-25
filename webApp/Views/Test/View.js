import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { withStyles } from 'material-ui/styles';
// import green from 'material-ui/colors/green';
// import { FormGroup, FormControlLabel } from 'material-ui/Form';
// import { Checkbox } from 'material-ui';
import TZ from 'TZ';
import Ripple from 'components/Ripples/index';
// import Sele from 'components/FakeAddressPicker/index';
import RedPack from './redpack.js';
import s from './css.less';

const Img = Ripple(
  <div>
    <img
      src="http://cdn01.weipaitang.com/img/20170820dNJhAFNqJhsMW57qE16wuSXkZVwSKd8OFdbzcUW2YpgLDg8U89hyQ2L-QsrvYPTb-W480H640/w/240"
      alt="error"
    />
  </div>,
);
const Bannal = Ripple([
  <button style={{ width: '7.5rem', height: '30px', backgroundColor: 'blue', border: 'none' }}>
    click me!
  </button>,
  <div style={{ width: '7.5rem', height: '50px', backgroundColor: '#777', color: '#fff' }}>
    ji in zo o
  </div>,
]);

// 计算公民身份证是否合法的函数
const calcIdentity = (num) => {
  // 表示第i位置上的加权因子
  num = num + '';
  console.log(num);
  const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码字符值
  const MODai = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 1];
  console.log(num.split('').filter((i, key) => key <= 16));
  const total = num
    .split('')
    .filter((i, key) => key <= 16)
    .reduce((accu, curr, currIndex) => {
      console.log(accu, curr, currIndex);
      return accu + curr * Wi[currIndex];
    }, 0);
  if (num.slice(0, num.length - 1) + MODai[total % 11] === num) {
    return true;
  }
  return false;
};

window.calcIdentity = calcIdentity;
export default class TT extends React.Component {
  state = {
    list: [],
    num: 0,
    show: false,
  };
  componentDidMount() {
    this.ref = {};
    const l = this.draw.getBoundingClientRect();
    this.rect = {
      minX: l.left,
      maxX: l.left + l.width,
      minY: l.top,
      maxY: l.top + l.height
    }
    this.hat.style.top = 0;
    this.hat.style.left = 0;
    console.log(this.rect);
    // const canvas = document.querySelector('#cancan');
    // const context = canvas.getContext('2d');
    // const img1 = new Image();
    // img1.onload = () => {
    //   context.drawImage(img1, 0, 0);
    // };
    // img1.src = '/static/qqqq.png';
    const eventType = TZ.os === 'phone' ? {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      leave: 'touchleave',
    } : {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      leave: 'mouseleave',
    };
    // targetTouches target
    const calcX = event => (TZ.os === 'phone' ? event.targetTouches.item(0).clientX : event.clientX);
    const calcY = event => (TZ.os === 'phone' ? event.targetTouches.item(0).clientY : event.clientY);
    this.endListener = () => {
      this.ref = {};
      this.hat.removeEventListener(eventType.move, this.moveListener);
      this.hat.removeEventListener(eventType.leave, this.endListener);
      this.hat.removeEventListener(eventType.end, this.endListener);
    };
    this.moveListener = (e) => {
      if ((calcX(e) < this.rect.minX || calcX(e) > this.rect.maxX) || (calcY(e) < this.rect.minY || calcY(e) > this.rect.maxY)) {
        this.endListener();
      }
      console.log(e.targetTouches);
      this.hat.style.left = calcX(e) - this.ref.startX;
      this.hat.style.top = calcY(e) - this.ref.startY;
      this.hat.addEventListener(eventType.leave, this.endListener);
      this.hat.addEventListener(eventType.end, this.endListener);
      window.requestAnimationFrame(this.moveListener);
    };
    this.hat.addEventListener(eventType.start, (e) => {
      this.ref = {
        startX: calcX(e),
        startY: calcY(e)
      };
      this.hat.addEventListener(eventType.move, (e) => {
        this.moveListener(e);
      });
    });
  }
  handle = () => {
    this.setState(
      {
        list: [
          ...this.state.list,
          <div key={this.state.num}>
            <CSSTransition classNames={'qq'} timeout={1000}>
              <div>{`${this.state.num}yuiyuiyui`}</div>
            </CSSTransition>
          </div>,
        ],
        num: this.state.num + 1,
      },
      () => {
        setTimeout(() => {
          this.setState({
            list: this.state.list.slice(1),
          });
        }, 1000);
      },
    );
  };
  acceptImg = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.onchange = () => {
      const imgUrl = window.URL.createObjectURL(input.files[0]);
      const img = new Image();
      img.onload = () => {
        let dWidth = img.width;
        let dHeight = img.height;
        let dx = 0;
        let dy = 0;
        if (img.height > 200 || img.width > 200) {
          if (img.height > img.width) {
            dWidth *= (200 / img.height);
            dHeight = 200;
            dx = 100 - (dWidth / 2);
          } else if (img.height < img.width) {
            dHeight *= (200 / img.width);
            dWidth = 200;
            dy = 100 - (dHeight / 2);
          } else {
            dWidth = dHeight = 200;
          }
        } else {
          dx = 100 - (dWidth / 2);
          dy = 100 - (dHeight / 2);
        }
        const cvs = document.getElementById('cvs');
        const context = cvs.getContext('2d');
        context.clearRect(0, 0, cvs.width, cvs.height);
        context.drawImage(img, dx, dy, dWidth, dHeight);
      };
      img.src = imgUrl;
    };
    input.click();
  }
  render() {
    // http://cdn.weipaitang.com/static/20171124248169a0-2bac-4746-b362-b952eb8ba533-W101H101
    return (
      <div className={s.body}>
        <button
          onClick={(e) => {
            console.log(e);
            this.setState({ show: !this.state.show });
          }}
        >
          click it
        </button>
        <canvas id="cancan" width="200px" height="200px" />
        <button className={s.uplig} onClick={this.acceptImg}>upload img</button>
        <div className={s.palette} ref={(a) => { this.draw = a; }}>
          <canvas id="cvs" width="200px" height="200px" />
          <img
            className={s.modifyHat}
            src="static/santa.png"
            alt="error"
            ref={(a) => { this.hat = a; }}
            width="64px"
            height="64px"            
          />
        </div>
      </div>
    );
  }
}
