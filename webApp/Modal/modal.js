import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import s from './modal.less';

export default class Modal extends Component {
  node = document.querySelector('#modal-root');
  static propTypes = {
    // overlay: ,
    duration: PropTypes.number,
    position: PropTypes.string,
    animeType: PropTypes.string,
  };
  static defaultProps = {
    duration: 300,
    isMasque: true,
    position: 'center', // center bottom top left right 
    animeType: 'fade',
  };
  state = {
    isOpened: true,
  }
  handleClose = () => {
    this.setState({ isOpened: false }, () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(this.node);
      }, this.props.duration)
    });
  }
  render() {
    const { isOpened } = this.state;
    const { duration, isMasque, position, animeType, children } = this.props;
    return (
      ReactDOM.createPortal(
        <div style={{ zIndex: '100' }}>
          <CSSTransition
            classNames={`animation-${animeType}`}
            timeout={duration}
            in={!!isOpened}
            mountOnEnter={true}
            unmountOnExit={true}
            appear={true}
          >
            {
              !!isMasque && <div className={s.masque} onClick={this.handleClose} />
            }
          </CSSTransition>
          {/* ENTERING ENTERED EXITING EXITED*/}

          <div
                  className={classnames(s[`${position}`])}
                  style={{
                    transitionDuration: `${duration}ms`,
                  }}
                >
                  {
                    React.cloneElement(children, { close: this.handleClose, ...children.props })
                  }
                </div>
          
        </div>,
        this.node
      )
    );
  }
}
