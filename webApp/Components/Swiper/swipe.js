import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Components/dots';
import s from './swipe.less';

// const TIME = 0.3;
const requestAnimaFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
// todos   ☑️无限轮播，☑️自动播放
export default class SwapComponent extends Component {
    static propTypes = {
        current: PropTypes.number,
        onSlideEnd: PropTypes.func,
        onSlideStart: PropTypes.func,
        loop: PropTypes.bool,      // ✅
        autoPlay: PropTypes.bool,
        // dots: PropTypes.node,
        dotsCss: PropTypes.object,
        margin: PropTypes.string,
        duration: PropTypes.number, // ✅
    };
    static defaultProps = {
        autoPlay: false,
        current: 0,
        duration: 0.3,
        loop: false,
        margin: '0',
        onSlideEnd: () => {},
        onSlideStart: () => {},
    };
    // screenWidth = document.body.getBoundingClientRect().left // eslint-disable-line
    state = {
        followMouseMove: 0,
        cancelAnimate: this.props.loop,
        moveTime: this.props.duration,
        current: this.props.current,
        autoPlay: this.props.autoPlay,
        loop: this.props.loop,
        // ...this.props,
    }
    componentDidMount() {
        if (this.props.children.length <= 1) {
            this.setState({ autoPlay: false, loop: false });
        }
        this.swapListener();
        if (this.state.autoPlay && this.state.loop) {
            this.interval = setInterval(() => {
                this.move(1)();
            }, 3000);
        }
        this.speed = this.swap.getBoundingClientRect().width / this.props.duration;
    }
    componentWillReceiveProps(newProps) {
        if (newProps.children.length >= 2 && this.props.loop) {
            this.setState({ loop: true });
        }
        if (newProps.current !== this.state.current) {
            this.move(newProps.current - this.state.current)();
        }
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.swap.removeEventListener(TZ.os === 'phone' ? 'touchstart' : 'mousedown', this.downListener);
        this.downListener = null;
    }
    hide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.swap.removeEventListener(TZ.os === 'phone' ? 'touchstart' : 'mousedown', this.downListener);
        this.downListener = null;
    }
    // 全段端的监听
    swapListener = () => {
        const isPhone = TZ.os === 'phone';
        const rect = this.swap.getBoundingClientRect();
        const touchType = {
            start: isPhone ? 'touchstart' : 'mousedown',
            move: isPhone ? 'touchmove' : 'mousemove',
            end: isPhone ? 'touchend' : 'mouseup',
        };
        let endX;       //
        let startX;     //
        let startY;     //
        let time;       // 点击发生时间
        let immoTime;   // 不销毁的时间（专门给pc端用）
        let isSwiping;  // 控制浏览器滑动方向
        // let moveTime;   // 计算动画所需要的时间
        // 计算位置
        const calcX = event => (isPhone ? event.targetTouches[0].clientX : event.clientX);
        const calcY = event => (isPhone ? event.targetTouches[0].clientY : event.clientY);
        const pcOnly = (event) => {
            if (new Date().getTime() - immoTime > 100) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.swap.removeEventListener('click', pcOnly, true);
        };
        const moveListener = (event) => {
            event.stopPropagation();
            if (calcX(event) < 45) return;

            // if (this.state.current < 0 || this.state.current >= this.props.children.length) return;
            if (Math.abs(calcX(event) - startX) - Math.abs(calcY(event) - startY) > 0 && isSwiping === undefined) {
                isSwiping = true;
            } else if (Math.abs(calcX(event) - startX) - Math.abs(calcY(event) - startY) < 0 && isSwiping === undefined) {
                isSwiping = false;
            }
            endX = calcX(event);
            // if (endX >= rect.right || endX <= rect.left) return;
            if (isSwiping) { // 左右滑动{
                event.preventDefault();
                if (this.state.loop) {
                    if (this.state.autoPlay) {
                        clearInterval(this.interval);
                        this.interval = null;
                    }
                    requestAnimaFrame(() => {
                        this.setState({ followMouseMove: calcX(event) - startX });
                    });
                } else {
                    if ((this.state.current === 0)
                        &&
                        (calcX(event) - startX) > rect.width / 3) {
                        return;
                    }
                    if (this.state.current === (this.props.children.length - 1)
                        &&
                        (calcX(event) - startX) < rect.width / -3) {
                        return;
                    }
                    requestAnimaFrame(() => {
                        this.setState({ followMouseMove: calcX(event) - startX });
                    });
                }
            } else {  // 上下滑动
            }
        };
        const upListener = (event) => {
            // event.preventDefault();
            if (this.state.current < 0 || this.state.current >= this.props.children.length) {
                event.stopPropagation();
                event.preventDefault();
            }
            if (this.state.autoPlay && this.state.loop && !this.interval) {
                this.interval = setInterval(() => {
                    this.move(1)();
                }, 3000);
            }
            const speed = (startX - endX) / (new Date().getTime() - time); // 为正向right，为负向left
            // 判断是否为点击
            if (!(startX - endX)) {
                this.swap.removeEventListener(touchType.move, moveListener, true);
                this.swap.removeEventListener(touchType.end, upListener, true);
                if (!isPhone) {
                    this.swap.removeEventListener('mouseout', upListener);
                }
                startX = undefined;
                startY = undefined;
                endX = undefined;
                time = undefined;
                isSwiping = undefined;
                // this.move()();  // 怀疑项目
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            if (rect.width < endX) endX = rect.width;
            this.curMoveTime = startX > endX ? (rect.width - startX + endX) / this.speed : (rect.width - endX + startX) / this.speed;
            if (Math.abs(speed) > 0.5) {
                if (speed < 0) {
                    this.move(-1)();
                } else if (speed > 0) {
                    this.move(1)();
                }
            } else if (Math.abs(startX - endX) > rect.width / 3) {
                if (speed < 0) {
                    this.move(-1)();
                } else if (speed > 0) {
                    this.move(1)();
                }
            } else {
                this.move()();
            }
            // this.setState({ followMouseMove: 0 });
            startX = undefined;
            startY = undefined;
            endX = undefined;
            time = undefined;
            isSwiping = undefined;
            this.swap.removeEventListener(touchType.move, moveListener, true);
            this.swap.removeEventListener(touchType.end, upListener, true);
            if (!isPhone) {
                this.swap.removeEventListener('mouseout', upListener);
            }
            // debugger;
        };
        this.downListener = (e) => {
            // e.stopPropagation();
            // e.preventDefault();
            if (this.state.current < 0) {
                this.setState({ cancelAnimate: true, current: this.props.children.length - 1 });
            } else if (this.state.current > this.props.children.length - 1) {
                this.setState({ cancelAnimate: true, current: 0 });
            }
            if (this.transitionTriger) {
                clearTimeout(this.transitionTriger);
                this.transitionTriger = null;
                this.props.onSlideEnd && this.props.onSlideEnd(this.state.current);
            }
            startX = calcX(e);
            startY = calcY(e);
            time = new Date().getTime();
            immoTime = time;
            this.swap.addEventListener(touchType.move, moveListener, true);
            this.swap.addEventListener(touchType.end, upListener, true);
            if (!isPhone) {
                this.swap.addEventListener('mouseout', upListener);
                this.swap.addEventListener('click', pcOnly, true);
            }
        };
        this.swap.addEventListener(touchType.start, this.downListener);
    }
    // 此处兼容按钮模式的swap所以这么写
    move = step => () => {
        if (this.state.loop) {
            if (this.state.current >= 0 && step < 0) {
                const current = this.state.current + step;
                const callback = () => {
                    this.props.onSlideEnd && current < 0 ? this.props.onSlideEnd(this.props.children.length - 1) : this.props.onSlideEnd(current);
                    clearTimeout(this.transitionTriger);
                    this.transitionTriger = null;
                };
                this.setState({ cancelAnimate: false, moveTime: this.curMoveTime || this.props.duration }, () => {
                    this.setState({ followMouseMove: 0, current }, () => {
                        this.transitionTriger = setTimeout(callback, this.state.moveTime * 1000);
                    });
                });
                this.props.onSlideStart && current < 0 ? this.props.onSlideStart(0) : this.props.onSlideStart(current + 1);
            } else if (this.state.current <= this.props.children.length - 1 && step > 0) {
                const current = this.state.current + step;
                const callback = () => {
                    this.props.onSlideEnd && current > this.props.children.length - 1 ? this.props.onSlideEnd(0) : this.props.onSlideEnd(current);
                    clearTimeout(this.transitionTriger);
                    this.transitionTriger = null;
                };
                this.setState({ cancelAnimate: false, moveTime: this.curMoveTime || this.props.duration }, () => {
                    this.setState({ current, followMouseMove: 0 }, () => {
                        this.transitionTriger = setTimeout(callback, this.state.moveTime * 1000);
                    });
                });
                this.props.onSlideStart && current > this.props.children.length - 1 ? this.props.onSlideStart(this.props.children.length - 1) : this.props.onSlideStart(current - 1);
            } else if (!step) {
                const callback = () => {
                    clearTimeout(this.transitionTriger);
                    this.transitionTriger = null;
                };
                this.setState({ cancelAnimate: false, moveTime: this.curMoveTime || this.props.duration }, () => {
                    this.setState({ followMouseMove: 0 }, () => {
                        this.transitionTriger = setTimeout(callback, this.state.moveTime * 1000);
                    });
                });
            }
        } else {
            if (step < 0 && this.state.current + step >= 0) {
                const current = this.state.current + step;
                const callback = () => {
                    this.props.onSlideEnd && this.props.onSlideEnd(current);
                    // prefixEventListener(this.swap, 'transitionEnd', callback, false);
                    clearTimeout(this.transitionTriger);
                    this.transitionTriger = null;
                };
                this.setState({ moveTime: this.curMoveTime || this.props.duration }, () => {
                    this.setState({ current, followMouseMove: 0 }, () => {
                        this.transitionTriger = setTimeout(callback, this.state.moveTime * 1000);
                    });
                });
                this.props.onSlideStart && this.props.onSlideStart(current + 1);
            } else if (step > 0 && (this.state.current + step <= this.props.children.length - 1)) {
                const current = this.state.current + step;
                // this.arr = [callback]
                const callback = () => {
                    this.props.onSlideEnd && this.props.onSlideEnd(current);
                    clearTimeout(this.transitionTriger);
                    this.transitionTriger = null;
                };
                this.setState({ moveTime: this.curMoveTime || this.props.duration }, () => {
                    this.setState({ current, followMouseMove: 0 }, () => {
                        this.transitionTriger = setTimeout(callback, this.state.moveTime * 1000);
                    });
                });
                this.props.onSlideStart && this.props.onSlideStart(current - 1);
            } else {
                this.setState({ moveTime: this.curMoveTime ? this.props.duration - this.curMoveTime : this.props.duration }, () => {
                    this.setState({ followMouseMove: 0 });
                });
            }
        }
        this.curMoveTime = null;
    }
    render() {
        const { current, followMouseMove, cancelAnimate, loop, moveTime } = this.state;
        const { dots, dotsCss, margin, children } = this.props;
        const divider = {
            unit: margin.match(/\D+/g) || 'px',
            width: parseInt(margin, 10) || 0,
        };
        return (
            <div style={{ overflowX: 'hidden' }}>
                <div
                    className={s.swapComp}
                    ref={(a) => { this.swap = a; }}
                    style={{
                        transform:
                            (children.length <= 1 || !loop) ?
                                followMouseMove !== 0 ?
                                    `translateX(calc(${followMouseMove}px - ${(current) * 100}% - ${(current + 1) * divider.width}${divider.unit}))`
                                    :
                                    `translateX(calc(-${(current) * 100}% - ${(current + 1) * divider.width}${divider.unit}))`
                                :
                                followMouseMove !== 0 ?
                                    `translateX(calc(${followMouseMove}px - ${(current + 1) * 100}% - ${(current + 2) * divider.width}${divider.unit}))`
                                    :
                                    `translateX(calc(-${(current + 1) * 100}% - ${(current + 2) * divider.width}${divider.unit}))`,
                        transition: cancelAnimate ? 'none' : followMouseMove !== 0 ? 'none' : `transform ${moveTime}s linear`,
                    }}
                >
                    {
                        (loop && children.length >= 2) &&
                        <div
                            className={s['warp-part']}
                            style={{
                                marginLeft: margin,
                            }}
                        >
                            {
                                React.cloneElement(children[children.length - 1], {
                                    ...children[children.length - 1].props,
                                    style: {
                                        ...children[children.length - 1].props.style,
                                    },
                                })
                            }
                        </div>
                    }
                    {
                        children.length !== 0 && children.map((child, index) => (
                            <div
                                className={s['warp-part']}
                                style={{
                                    marginLeft: margin,
                                }}
                                key={index}
                            >
                                {
                                    React.cloneElement(child, {
                                        ...child.props,
                                        style: {
                                            ...child.props.style,
                                        },
                                    })
                                }
                            </div>
                        ))
                    }
                    {
                        (loop && children.length >= 2) &&
                        <div
                            className={s['warp-part']}
                            style={{
                                marginLeft: margin,
                            }}
                        >
                            {
                                React.cloneElement(children[0], {
                                    ...children[0].props,
                                    style: {
                                        ...children[0].props.style,
                                    },
                                })
                            }
                        </div>
                    }
                </div>
                {
                    dots ?
                        React.isValidElement(dots.node) ?
                            React.cloneElement(
                                dots.node,
                                dots.node.props,
                                dots.node.props.children.map((child, index) => (
                                    React.cloneElement(child, { className: `${child.props.className} ${current === index ? dots.active : ''}` })
                                )),
                            )
                            :
                            <Dots length={children} curNode={current < 0 ? this.props.children.length - 1 : current > this.props.children.length - 1 ? 0 : current} dotsCss={dotsCss} />
                        :
                        ''
                }
            </div>
        );
    }
}

// SwapComponent.WarpPart = props => (
//     React.cloneElement(props.children, { ...props.children.props })
// );
