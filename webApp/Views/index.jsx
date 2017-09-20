import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import Test from 'components/test';
// import { AppContainer } from 'react-hot-loader';
import Index from './Index/mainIndex';
// import Article from 'components/Article/index';
const Func = () => (
    <div>
      <Test />
      <Test />
      <Test />
      <Test />
      <Index />
    </div>
);


ReactDOM.render(<Func />, document.querySelector('#root'));

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     ReactDOM.render(<Func />, document.querySelector('#root'));
//   });
// }
