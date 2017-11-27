import React from 'react';
import { Router, Link } from 'react-router-dom';
// import { Button } from 'material-ui';
import s from './index.less';

export default function ({ history }) {
  
  // return <Button color="accent"><div>????</div></Button>
  return (
    <Router history={history}>
      <div className={s.mainMenu}>
        <Link className={s.item} to="/mainIndex">
          <div className={s.mainIndex}>
            <i className="material-icons material-icons.md-48">home</i>
            <div>首页</div>
          </div>
        </Link>
        <Link className={s.item} to="/Page">
          <div className={s.unknown}>
            <i className="material-icons material-icons.md-48">class</i>
            <div>书签</div>
          </div>
        </Link>
        <Link className={s.item} to="/Test">
          <div className={s.unknown}>
            <i className="material-icons material-icons.md-48">error</i>
            <div>施工中</div>
          </div>
        </Link>
        <Link className={s.item} to="/Image3D">
          <div className={s.unknown}>
            <i className="material-icons material-icons.md-48">explore</i>
            <div>发现</div>
          </div>
        </Link>
      </div>
    </Router>
  );
}
