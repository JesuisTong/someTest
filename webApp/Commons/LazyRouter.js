import React, { Component } from 'react';

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  // 加载
  load = (props) => {
    props.load(this.cb)();
  }
  // 回调
  cb = (_import) => {
    this.setState({ mod: _import.default || null });
  }

  render() {
    const Mod = this.state.mod;
    return this.state.mod ? <Mod /> : null
  }
}

export default function bundle(promise) {
  return () => (
    <Bundle load={promise} />
  )
}