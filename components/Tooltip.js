const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

class Tooltip extends Component {

    get css () {
        const { darklight, foreground, highlight } = palette;
        const visible = this.state.get('visible');
        const position = this.parentElement.getBoundingClientRect();
        const top = position.height;
        const left = position.width / 2;

        return `
            :host {
                z-index: 3;
                position: absolute;
                left: ${ left }px;
                top: ${ top }px;
                display: flex;
                justify-content: center;
                flex-grow: 0;
                flex-shrink: 1;
                width: 0;
                margin-left: 0;
                overflow: ${ visible ? 'visible' : 'hidden' };
                transition: all .12s ease;
            }

            #tooltip {
                position: relative;
                display: block;
                margin: 6px 0 0;
                padding: 4px 8px;
                white-space: nowrap;
                font-size: 11px;
                font-weight: 300;
                color: white;
                background: hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.77);
                opacity: ${ visible ? 1 : 0 };
                transition: all .12s ease;
            }

            #tooltip::before {
                content: "";
                position: absolute;
                top: -8px;
                left: 50%;
                width: 0;
                height: initial;
                margin-left: -8px;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.77);
            }
        `;
    }

    handleComponentReady () {
        this.parentElement.addEventListener('mouseenter', () => this.state.set('visible', true))
        this.parentElement.addEventListener('mouseleave', () => this.state.set('visible', false))
    }

    render () {
        return [
            element('p', { id: 'tooltip' }, this.text)
        ]
    }
};

Tooltip.elementName = 'elementary-tooltip';

Tooltip.defaultProperties = {
    text: 'tooltip'
};

Tooltip.initialState = {
    visible: false
};

module.exports = Tooltip;
