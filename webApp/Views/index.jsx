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
  Link
} from 'react-router-dom';

// 视图组件
import Index from './Index/mainIndex';
import TodoList from './TodoList/index';
// CSS
import '../Commons/index.css';

const store = createStore(reducer);

const List = () => (
	<Provider store={store}>
    	<TodoList />
  	</Provider>
)

const Func = () => (
	<Router>
		<div>
			<Link to="/index">index</Link>
			<Route path="/todoList" component={List}/>
			<Route path="/index" component={Index}/>
		</div>
	</Router>
);




ReactDOM.render(<Func />, document.querySelector('#root'));

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     ReactDOM.render(<Func />, document.querySelector('#root'));
//   });
// }
