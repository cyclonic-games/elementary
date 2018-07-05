const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Toolbar extends Component {

    get css () {
        const { white, brand, foreground, highlight } = palette;

        return `
            #container {
                height: 36px;
                margin-bottom: 4px;
                background: hsl(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%);
            }
        `;
    }

    render () {
        return (
            element('header', { id: 'container' }, [
                element('slot')
            ])
        );
    }
};

module.exports.elementName = 'elementary-toolbar';
