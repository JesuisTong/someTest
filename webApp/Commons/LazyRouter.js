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

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      console.log(mod);
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default function bundle(lazyBundle) {
  return () => (
    <Bundle load={lazyBundle}>
      {
        (Comp) => (
          !!Comp ? 
            typeof Comp === 'function' ?
            <Comp />
            :
            Object.keys(Comp).map((key, index) => {
              const C = Comp[key];
              return <C key={index} /> || 'router not found'
            })
          :
          'router not found'
        )
      }
    </Bundle>
  )
}