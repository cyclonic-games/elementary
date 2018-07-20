const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

const Icon = require('./Icon');

class Menu extends Component {

    get css () {
        const { darklight } = palette;

        return `
            :host {
                width: 100%;
            }

            #menu {
                display: flex;
                width: calc(100% + 8px);
                height: 26px;
                margin: -4px -4px 4px;
                padding: 0 8px;
                font-size: 11px;
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

Menu.elementName = 'elementary-menu';

Menu.Tree = class MenuTree extends Component {

    get css () {
        const { darklight } = palette;

        return `
            :host {
                display: flex;
                flex-grow: 1;
                width: 100%
            }

            #menu {
                display: flex;
                flex-grow: 1;
                width: calc(100% + 8px);
                margin: -4px;
            }

            #tree {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 12px;
            }
        `;
    }

    deselect (children = this.children) {
        for (const item of children) {
            item.state.set('selected', false);
            this.deselect(item.children);
        }
    }

    handleClick (event) {
        if (event.target !== event.currentTarget) {
            this.deselect();
            event.target.state.set('selected', true);
        }
    }

    render () {
        return [
            element('header', { id: 'menu' }, [
                element('ul', { id: 'tree', onclick: e => this.handleClick(e) }, [
                    element('slot')
                ])
            ])
        ];
    }
};

Menu.Tree.elementName = 'elementary-menu-tree';

Menu.Item = class MenuItem extends Component {

    get css () {
        const { brand, highlight, white } = palette;
        const level = this.state.get('level');
        const selected = this.state.get('selected');

        return `
            :host-context(${ Menu.Tree.elementName }) #menu-item {
                padding-left: ${ this.children.length > 0
                    ? 16 + (16 * level)
                    : (28 + (16 * (level ? level - 1 : 0)))
                }px;
            }

            :host-context(${ Menu.Tree.elementName }) #icon {
                display: unset;
            }

            #container {
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 0;
                list-style: none;
            }

            #menu-item {
                display: flex;
                align-items: center;
                height: 24px;
                margin: 0;
                padding: 0 8px;
                line-height: 0;
                font-size: inherit;
                font-family: inherit;
                text-align: start;
                text-indent: 4px;
                color: hsla(${ white[ 0 ] }, ${ white[ 1 ] }%, ${ white[ 2 ] }%, 0.75);
                background: none;
                border: none;
                outline: none;

                ${ selected && `
                    font-weight: 600;
                    color: white;
                    background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                ` }
            }

            #caret {
                margin-right: -4px;
                margin-left: -20px;
            }

            #icon {
                display: none;
                margin-right: 4px;
            }

            #menu-item-children {
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 0;
                list-style: none;
            }
        `;
    }

    handleComponentConnect () {
        if (this.parentNode.localName === Menu.Item.elementName) {
            this.state.set('level', (this.parentNode.state.get('level') || 0) + 1);
        }
    }

    toggle () {
        this.state.set('open', !this.state.get('open'));
    }

    render () {
        const open = this.state.get('open');
        const selected = this.state.get('selected');

        return [
            element('li', { id: 'container' }, [
                element('button', { id: 'menu-item' }, [
                    this.children.length > 0 && (
                        element(Icon, {
                            id: 'caret',
                            size: 12,
                            glyph: open ? 'navigation/expand_more' : 'navigation/chevron_right',
                            color: 'rgba(255, 255, 255, 0.7)',
                            onclick: e => this.toggle()
                        })
                    ),
                    element(Icon, {
                        id: 'icon',
                        size: 12,
                        glyph: this.children.length > 0 ? open ? 'file/folder_open' : 'file/folder' : this.icon,
                        color: selected ? 'white' : 'rgba(255, 255, 255, 0.7)'
                    }),
                    this.text
                ]),
                this.children.length > 0 && (
                    element('ul', { id: 'menu-item-children' }, [
                        open && element('slot')
                    ])
                )
            ])
        ]
    }
};

Menu.Item.elementName = 'elementary-menu-item';

Menu.Item.initialState = {
    level: 0,
    open: true,
    selected: false
};

Menu.Item.defaultProperties = {
    icon: 'action/description',
    text: ''
};

module.exports = Menu;
