const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

const Icon = require('./Icon');

module.exports = class Toolbar extends Component {

    get css () {
        const { white, brand, foreground, highlight, darklight } = palette;

        return `
            #container {
                display: flex;
                align-items: center;
                height: 36px;
                margin-bottom: 4px;
                padding: 0 8px;
                background: hsla(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%, 0.60);
                box-shadow: 0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
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

module.exports.Button = class ToolbarButton extends Component {

    get css () {
        const { highlight, darklight, background } = palette;

        return `
            :host {
                margin-right: -1px;
                line-height: 0;
                border: 1px solid hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                border-radius: 1px;
            }

            #button {
                width: 28px;
                height: 26px;
                margin: 0;
                padding: 0;
                line-height: 0;
                font-size: inherit;
                font-family: inherit;
                color: rgba(255, 255, 255, 0.8);
                background: inherit;
                border: none;
                box-shadow: inset 0 1px hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.66);
                outline: none;
                transition: all .12s ease;
            }

            #button:hover {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
            }

            #button:active {
                background: hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                box-shadow: inset 0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
            }
        `;
    }

    render () {
        return (
            element('button', { id: 'button' }, [
                element(Icon, { size: 18, glyph: this.icon, color: 'rgba(255, 255, 255, 0.75)' })
            ])
        )
    }
};

module.exports.Button.elementName = 'elementary-toolbar-button';

module.exports.Button.defaultProperties = {
    icon: 'content/save'
};

module.exports.Divider = class ToolbarDivider extends Component {

    get css () {
        const { highlight, darklight } = palette;

        return `
            :host {
                width: 0;
                height: 26px;
                margin: 0 8px;
            }
        `;
    }

    render () {
        return null
    }
};

module.exports.Divider.elementName = 'elementary-toolbar-divider';
