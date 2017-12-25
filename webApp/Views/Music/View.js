import React from 'react';
// import { CSSTransition } from 'react-transition-group';
import s from './index.less';

const requestAnimaFrame = window.requestAnimationFrame;

export default class Music extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      procesa: 0,
      start: false,
    };
    this.deg = 0;
  }
  componentDidMount() {
    this.audio = new Audio('/static/1111.mp3');
    this.audio.preload = 'matadata';
    this.listenProce();
    this.audio.volume = 0.5;
  }
  audioControll = (isRun) => {
    if (isRun) {
      this.audio.play().then(() => {
        this.process = cb => () => {
          if (this.audio.currentTime === this.audio.duration) {
            this.handleClick();
            this.process = null;
            return;
          }
          if (this.deg >= 360) {
            this.deg = 0;
          } else {
            this.deg += 1;
          }
          this.circle.style.transform = `rotateZ(${this.deg}deg)`;
          this.setState({
            procesa: `${this.audio.currentTime / this.audio.duration * 100}%`,
          });
          this.process && requestAnimaFrame(this.process);
        };
        requestAnimaFrame(this.process);
      });
    } else {
      this.audio.pause();
      this.process = null;
    }
  };
  handleClick = () => {
    this.setState({ start: !this.state.start }, () => {
      this.audioControll(this.state.start);
    });
  };
  // 控制进度条
  listenProce = () => {
    const eventarget = {
      start: TZ.os === 'phone' ? 'touchstart' : 'mousedown',
      move: TZ.os === 'phone' ? 'touchmove' : 'mousemove',
      end: TZ.os === 'phone' ? 'touchend' : 'mouseup',
    };
    let status = false;
    let axisX;
    let axisY;
    const moveListener = (e) => {
      window.requestAnimationFrame(() => {
        axisX = TZ.os === 'phone' ? e.targetTouches[0].offsetX : e.offsetX;
        axisY = TZ.os === 'phone' ? e.targetTouches[0].offsetY : e.offsetY;
        this.setState(
          {
            procesa: `${axisX / this.prrr.getBoundingClientRect().width * 100}%`,
          },
          () => {
            if (axisY <= 0 || axisY >= this.prrr.getBoundingClientRect().height) {
              status = false;
              axisX = null;
              axisY = null;
              this.audio.currentTime = parseInt(this.state.procesa, 10) / 100 * this.audio.duration;
              this.prrr.removeEventListener(eventarget.move, moveListener);
              this.prrr.removeEventListener(eventarget.end, endListener);
            }
            if (!status) {
              status = true;
              this.prrr.addEventListener(eventarget.end, endListener);
            }
          },
        );
      });
    };
    const endListener = () => {
      status = false;
      axisX = null;
      axisY = null;
      this.audio.currentTime = parseInt(this.state.procesa, 10) / 100 * this.audio.duration;
      this.prrr.removeEventListener(eventarget.move, moveListener);
      this.prrr.removeEventListener(eventarget.end, endListener);
    };
    this.prrr.addEventListener(eventarget.start, (e) => {
      // let axisStart = TZ.os === 'phone' ? e.targetTouches[0].offsetX : e.target.offsetX;
      const axisMove = null;
      this.prrr.addEventListener(eventarget.move, moveListener);
    });
  };
  // http://p.blog.csdn.net/images/p_blog_csdn_net/nooon/EntryImages/20090508/image1.jpg
  render() {
    const { procesa } = this.state;
    return (
      <div className={s.music}>
        <div
          className={s.bg}
          style={{ backgroundImage: 'url(/static/02d4fd8ea0ec08fa5a169d1453ee3d6d54fbda4c.jpg)' }}
        />
        <div
          className={s.circle}
          style={{ backgroundImage: 'url(/static/02d4fd8ea0ec08fa5a169d1453ee3d6d54fbda4c.jpg)' }}
          ref={(a) => {
            this.circle = a;
          }}
        />
        <div
          className={s.processBar}
          ref={(a) => {
            this.prrr = a;
          }}
        >
          <span className={`${s.cur} material-icons`} style={{ width: procesa }} />
        </div>
        <input type="range" />
        <button className={s.btn} onClick={this.handleClick}>
          开始
        </button>
      </div>
    );
  }
}
