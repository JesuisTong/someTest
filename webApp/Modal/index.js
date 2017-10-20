import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import s from './index.less';

class WrapComponent {
    static getUuid(len = 8) {
        const STR = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        return ' '.repeat(len).split('').map(() => STR[Math.round(Math.random() * (STR.length - 1))]).join('');
    }
    constructor(Comp, type) {
        const node = document.createElement('div');
        node.className = `modalLoader-${WrapComponent.getUuid()}`;
        node.style.position = 'fixed';
        node.style.top = 0;
        node.style.bottom = 0;
        node.style.left = 0;
        node.style.right = 0;
        node.style.zIndex = 1999;
        node.style.width = '7.5rem';
        node.style.margin = '0 auto';
        document.body.appendChild(node);
        const close = () => {
            unmountComponentAtNode(node);
            document.body.removeChild(node);
            // REALITY[this.type] = null;
        };
        this.type = type;
        this.node = node;
        this.render(Comp, { close }, node);
    }
    render(Comp, props, node) {
        let ReformatComp;
        if (props.close) {
            ReformatComp = React.cloneElement(Comp, { onClose: props.close });
        } else {
            ReformatComp = React.cloneElement(Comp, { ...props });
        }
        this.newComp = ReformatComp;
        // REALITY[this.type] = Comp;
        ReactDom.render(ReformatComp, node);
    }
}

class Modal extends Component {
	componentDidMount() {

	}
	componentWillUnmount() {

	}
  formatComp = (dom) => {
    return (
      <div className={classnames(s.wrap, {
        
      })}>
        <div className={s.masque} />
          {
            React.isValidElement(dom) ? dom : <div dangerouslySetInnerHTML={{ __html: dom }} />
          }
      </div>
    );
  }
  render() {
    const { node } = this.props;
    return ReactDOM.createPortal(
      this.formatComp(node),
      document.querySelector('#modal-root'),
    );
  }
}




const open = (node) => (
  <Modal node={node} />
)

export default open;