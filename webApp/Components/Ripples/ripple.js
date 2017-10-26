import React from 'react';
import { TransitionGroup, Transition } from 'react-transition-group'
// import s from './index.less';

class Ripple extends React.Component {
    state = {
        list: [],
    }
    componentDidMount() {
        
    }
    handleClick = () => {
        this.setState({ list: this.state.list.push(this.renderRipple()) });
    }
    renderRipple = () => (
        <Bubble />
    )
    
    render() {
        const { children } = this.props;
        return (<div ref={(a) => { this.node = a; }}>
            {children}
            <span>
                {this.state.list}
            </span>
        </div>);
    }
}

export default function (Comp) {
    return () => (
        <TransitionGroup>
            {Comp}
        </TransitionGroup>
    );
}
