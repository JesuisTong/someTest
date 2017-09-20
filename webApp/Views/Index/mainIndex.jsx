import React, { Component } from 'react';
// import Article from 'components/Article/index';
import API from 'static/queryManga';
import s from './mainIndex.less';

export default class Index extends Component {
  state = {
    value: '',
    detail: '',
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  handleClick = () => {
    const cb = (context) => {
      this.setState({ detail: JSON.stringify(context) })
    };
    API(this.state.value, cb);
  }
  render() {
    const { value = '', detail = '' } = this.state;
    return (
      <div className={s['main-container']}>
        <input className={s.input} onChange={this.handleChange} value={value} placeholder="输入你想查询的动漫人物" />
        <button className={s.button} onClick={this.handleClick}>查询</button>
        <div className={s.detail}>{detail}</div>
      </div>
    );
  }
}
