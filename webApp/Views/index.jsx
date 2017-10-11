// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'Redx/reducer';
// Router
import {
  HashRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

// 视图组件
import Index from './Index/mainIndex';
import TodoList from './TodoList/index';
import BottomBanner from 'components/BottomBanner';
// CSS
import '../Commons/index.css';

const store = createStore(reducer);

const List = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
)
const XXX = () => (
  <img src="static/825ecc3f8794a4c2c12272d304f41bd5ac6e391f.jpg" />
)
const Func = () => ([
  <Router key="Router">
    <div>
      <Link to="/index">index</Link>
      <Route path="/todoList" component={List} />
      <Route path="/index" component={Index} />
      <Route path="/mainIndex" component={XXX} />
    </div>
  </Router>,
  <BottomBanner key="botBanner" />,
]);


ReactDOM.render(<Func />, document.querySelector('#root'));

