const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Menu extends Component {

    get css () {
        const { darklight } = palette;

        return `
            :host {
                width: 100%
            }

            #menu {
                display: flex;
                width: calc(100% + 8px);
                height: 26px;
                margin: -4px -4px 4px;
                padding: 0 8px;
                background: hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.66);
                box-sizing: border-box;
            }
        `;
    }

    render () {
        return [
            element('header', { id: 'menu' }, [
                element('slot')
            ])
        ];
    }
};

module.exports.elementName = 'elementary-menu';

module.exports.Item = class MenuItem extends Component {

    get css () {
        const { white } = palette;

        return `
            #menu-item {
                display: flex;
                height: 100%;
                margin: 0;
                padding: 0 8px;
                line-height: 0;
                font-size: 11px;
                font-family: inherit;
                color: hsla(${ white[ 0 ] }, ${ white[ 1 ] }%, ${ white[ 2 ] }%, 0.75);
                background: none;
                border: none;
                outline: none;
            }

            #menu-item:hover {
                color: white;
                background: #2f3543;
            }
        `;
    }

    render () {
        return [
            element('button', { id: 'menu-item' }, [
                element('slot')
            ])
        ]
    }
};

module.exports.Item.elementName = 'elementary-menu-item';
