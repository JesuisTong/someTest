import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Modal from './modal';
import s from './index.less';

// class ModalLayer {
//   constructor() {

//   }
//   render() {
//     ReactDOM.render(<Modal />, this.node);
//   }
// }

export default function A(Comp) {
  ReactDOM.render(
    <Modal>
      {
        React.isValidElement(Comp) ? Comp : <div dangerouslySetInnerHTML={{ __html: Comp }} />
      }
    </Modal>,
    document.querySelector('#modal-root')
  )
}