// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'Redx/reducer';
// Router
import {
  Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

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

const store = createStore(reducer);

const formatRouter = (comp, name) => (
  <Route path={`/${name}`} component={TZ.bundle(comp)} />
)
// <Link to="/Page" style={{ display: 'block' }}>Page</Link>
// <Link to="/Index" style={{ display: 'block' }}>Index</Link>
// <Link to="/TodoList" style={{ display: 'block' }}>TodoList</Link>
const Func = () => ([
  <Router key="Router" history={TZ.history}>
    <Switch>
      {formatRouter(SendFile, 'SendFile')}
      {formatRouter(Page, 'Page')}
      {formatRouter(Index, 'Index')}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {formatRouter(Test, 'Test')}
      {formatRouter(Music, 'Music')}
      <Route path="/TodoList">
        <Provider store={store}>
          {React.createElement(TZ.bundle(TodoList), null)}
        </Provider>
      </Route>
      <Route component={TZ.bundle(NotFound)} />
    </Switch>
  </Router>,
  <BottomBanner history={TZ.history} key="botBanner" />,
]);

ReactDOM.render(<Func />, document.querySelector('#root'));

