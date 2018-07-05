const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Pane extends Component {

    get css () {
        const { white, brand, foreground, highlight } = palette;

        return `
            :host {
                display: flex;
            }

            #content {
                display: flex;
                width: ${ this.width.toString().includes('%') ? this.width : `${ this.width }px` };
                flex-grow: 1;
                flex-direction: column;
                padding: 4px;
                color: hsl(${ white[ 0 ] }, ${ white[ 1 ] }%, ${ white[ 2 ] }%);
                background: hsl(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%);
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
            }
        `;
    }

    render () {
        return (
            element('article', { id: 'content' }, [
                element('slot')
            ])
        );
    }
};

module.exports.elementName = 'elementary-pane';

module.exports.defaultProperties = {
    width: 0
};
