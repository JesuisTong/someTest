import React, { PureComponent } from 'react';
import s from './from.less';

export default class From extends PureComponent {
  render() {
    const { topic = '', logo = '' } = this.props.from;
    return (
      <div className={s.header}>
        <span className={s.logo}>
          <img className={s.img} src={logo} alt="error" />
        </span>
        <span className={s.topic}>
          {`来自话题：${topic}`}
        </span>
      </div>
    );
  }
}
