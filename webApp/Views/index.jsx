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
// 工具组件
import bundle from '../Commons/LazyRouter';

// 视图组件
import Index from './Index/mainIndex';
import TodoList from './TodoList/index';
import BottomBanner from 'components/BottomBanner';

// lazy视图组件
import Page1 from './Page/View';
// CSS
import '../Commons/index.css';

// import a from '../Utils/View';
// console.log(a)

const store = createStore(reducer);

const XXX = bundle(Page1);

const List = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
)
const Func = () => ([
  <Router key="Router">
    <div>
      <Link to="/index">index</Link>
      <Link to="/mainIndex" style={{ color: 'red' }}>Page1</Link>
      <Route path="/todoList" component={List} />
      <Route path="/index" component={Index} />
      <Route path="/mainIndex" component={XXX} />
    </div>
  </Router>,
  <BottomBanner key="botBanner" />,
]);


ReactDOM.render(<Func />, document.querySelector('#root'));

