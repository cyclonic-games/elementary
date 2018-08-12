const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Canvas extends Component {

    get css () {
        const { foreground, highlight } = palette;

        return `
            :host {
                display: flex;
                flex-grow: ${ this.grow };
                background-color: hsla(${ foreground[ 0 ] + 1 }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] - 4 }%, 0.96);
                background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.18) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.18) 75%, rgba(0, 0, 0, 0.18)),
                                  linear-gradient(45deg, rgba(0, 0, 0, 0.18) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.18) 75%, rgba(0, 0, 0, 0.18));
                background-size: 16px 16px;
                background-position: 0 0, 8px 8px;
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.33);
            }

            #canvas {
                display: block;
            }
        `;
    }

    getContext (type) {
        return this.shadowRoot.getElementById('canvas').getContext(type);
    }

    render () {
        return [
            element('canvas', { id: 'canvas', width: this.width, height: this.height })
        ]
    }
};

module.exports.elementName = 'elementary-canvas';

module.exports.defaultProperties = {
    grow: 0,
    width: 256,
    height: 256
};
