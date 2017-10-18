import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './dots.less';

export default class Dots extends Component {
    static propTypes = {
        // length: PropTypes.array,
        curNode: PropTypes.number,
        dotsCss: PropTypes.object,
    }
    render() {
        const { length, curNode, dotsCss = {} } = this.props;
        // const css = dotsCss ? { ...s, ...dotsCss } : s;
        return (
            <ul className={`${s.dots} ${dotsCss.dots || ''}`} >
                {
                    length.length !== 0 && length.map((child, index) => (
                        <li className={`${s.dot} ${dotsCss.dot || ''} ${curNode === index ? `${s.active} ${dotsCss.active || ''}` : ''}`} key={index} />
                    ))
                }
            </ul>
        );
    }
}
