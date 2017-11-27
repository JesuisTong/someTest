import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './lazyRouter.less';


class Bundle extends Component {

  state = {
    mod: null,   // short for "module" but that's a keyword in js, so "mod"
    in: this.props.history.action === 'PUSH' ? 'go' : '',   // controll animate when page history go and back
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
    if (this.props.match.isExact && nextProps.history.action === 'POP') {
      this.setState({ in: 'back' });
    } else if (nextProps.match.isExact) {   // 这是一个出现页滑动的标记
      this.setState({ in: 'go' });
    } 
  }
  // async componentWillUnmount() {
  //   await setTimeout(() => {console.log(111)}, 400)
  // }
  // 加载
  load = (props) => {
    props.load(this.cb)();
  }
  // 回调
  cb = (_import) => {
    this.setState({ mod: _import });
  }

  render() {
    const Mod = this.state.mod && this.state.mod.default;
    const show = this.state.in !== 'back';
    const classNamee = this.state.in ? 'slide' : '';
    if (Mod) {
      return (
        <CSSTransition
          classNames={classNamee}
          timeout={30000}
          in={show}
          mountOnEnter={true}
          unmountOnExit={true}
          appear={true}
        >
          <Mod />
        </CSSTransition>
      );
    } else {
      return null;
    }
  }
}

export default function bundle(component) {
  return (props) => (
    <Bundle load={component} {...props} />
  )
}