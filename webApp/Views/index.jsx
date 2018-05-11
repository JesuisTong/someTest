// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'Redx/reducer';
// Router
import { Router, Route, Switch } from 'react-router-dom';
// import { TransitionGroup } from 'react-transition-group';
// 底部banner组件
import BottomBanner from 'components/BottomBanner';

// lazy视图组件
import Page from './Page/View';
import Index from './Index/View';
import TodoList from './TodoList/View';
import NotFound from './NotFound/View';
import SendFile from './SendFile/View';
import Test from './Test/View';
import Music from './Music/View';
import Image3D from './ImageList/View';

const store = createStore(reducer);

const formatRouter = (comp, name) => (
  <Route
    path={`/${name}`}
    render={(props) => {
      const Comp = TZ.bundle(comp);
      return <Comp {...props} />;
    }}
  />
);
// <Link to="/Page" style={{ display: 'block' }}>Page</Link>
// <Link to="/Index" style={{ display: 'block' }}>Index</Link>
// <Link to="/TodoList" style={{ display: 'block' }}>TodoList</Link>
const Func = () => [
  <Router key="Router" history={TZ.history}>
    <Switch>
      {formatRouter(SendFile, 'SendFile')}
      {formatRouter(Page, 'Page')}
      {formatRouter(Index, 'Index')}
      {formatRouter(Test, 'Test')}
      {formatRouter(Music, 'Music')}
      {formatRouter(Image3D, 'Image3D')}
      <Route path="/TodoList">
        <Provider store={store}>{React.createElement(TZ.bundle(TodoList), null)}</Provider>
      </Route>
      <Route component={TZ.bundle(NotFound)} />
    </Switch>
  </Router>,
  <BottomBanner history={TZ.history} key="botBanner" />,
];

ReactDOM.render(<Func />, document.querySelector('#root'));
