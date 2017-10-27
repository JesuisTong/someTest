import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import s from './ripple.less';

export default class Ripple extends React.Component {
    state = {
        list: [],
        numKey: 0,
    }
    componentDidMount() {
        this.listener();
        this.rect = this.node.getBoundingClientRect();
        // this.node.addEventListener('touchstart', () => {})
        // this.node.addEventListener('mousedown')
    }
    componentWillUnmount() {

    }
    listener = () => {
        // const event = TZ.os === 'pc' ? 'mousedown' : 'touchstart';
        this.node.addEventListener(TZ.os === 'pc' ? 'mousedown' : 'touchstart', (e) => {
            this.add(
                TZ.os === 'pc' ? e.clientX : e.targetTouches[0].clientX,
                TZ.os === 'pc' ? e.clientY : e.targetTouches[0].clientY,
            );
        })
    }
    add = (x, y) => {
        console.log(x, y, this.rect);
        this.setState({
            list: [
                ...this.state.list,
                <CSSTransition
                    key={this.state.numKey}
                    classNames="animation"
                    timeout={450}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    appear={true}
                >
                    <span
                        className={s.outrp}
                        style={{
                            left: `${x - this.rect.left - this.rect.width}px`,
                            top: `${y - this.rect.top - this.rect.height}px`
                        }}
                    />
                </CSSTransition>,
            ],  
            numKey: this.state.numKey + 1,
        }, () => {
            setTimeout(() => {
                this.remove();
            }, 450);
        })
    }
    remove = () => {
        if (this.state.list && this.state.list.length) {
            this.setState({
                list: this.state.list.slice(1)
            });
        }
    }
    render() {
        const { children, innerRef } = this.props;
        const { list } = this.state;
        // console.log(list);
        return (
            <span ref={(a) => { this.node = a; }} style={{ overflow: 'hidden', position: 'relative', display: 'inline-block' }}>
                <TransitionGroup
                    component="span"
                    enter
                    exit
                >
                    {list}
                </TransitionGroup>
                {children}
            </span>
        );
    }
}