import React from 'react';
import s from './test.less';


const func = ({ onClick, onChange, onHidden, text }) => (
  <li className={s.qwe}>
    <input onChange={(e) => { onChange(e.target.value || '') }} value={text} />
    <span onClick={onClick}><i className="material-icons material-icons.md-24">delete</i></span>
    <span onClick={onHidden}><i className="material-icons material-icons.md-24">visibility off</i></span>
  </li>
);

export default func;
