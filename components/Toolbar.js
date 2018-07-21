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
                height: ${ this.small ? '25px' : '36px' };
                margin-bottom: 4px;
                padding: 0 8px;
                background: hsla(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%, 0.60);
                box-shadow: 0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
            }
        `;
    }

    handleComponentRender () {
        if (this.small && !this.classList.contains('small')) {
            this.classList.add('small');
        }
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

module.exports.defaultProperties = {
    small: false
};

module.exports.Button = class ToolbarButton extends Component {

    get css () {
        const { highlight, darklight, background } = palette;
        const active = this.state.get('active');

        return `
            :host {
                margin-right: -1px;
                line-height: 0;
                border: 1px solid hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                border-radius: 1px;
            }

            :host-context(${ module.exports.elementName }.small) #button {
                width: 20px;
                height: 18px;
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

                ${ active && `
                    background: hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                    box-shadow: inset 0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
                ` }
            }

            ${ !active && `
                #button:hover {
                    background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                }
            ` }

            #button:active {
                background: hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                box-shadow: inset 0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
            }
        `;
    }

    handleClick () {
        const { group, parentElement, toggle } = this;

        if (!toggle) {
            return;
        }

        if (group) for (const button of parentElement.children) if (button.group === group) {
            button.state.set('active', false);
        }

        this.state.set('active', !this.state.get('active'));
    }

    render () {
        const { brand } = palette;
        const active = this.state.get('active');
        const small = Boolean(this.closest(`${ module.exports.elementName }.small`));

        return (
            element('button', { id: 'button', onclick: e => this.handleClick(e) }, [
                element(Icon, { size: small ? 14 : 18, glyph: this.icon, color: active ? `hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%)` : 'rgba(255, 255, 255, 0.75)' })
            ])
        )
    }
};

module.exports.Button.elementName = 'elementary-toolbar-button';

module.exports.Button.defaultProperties = {
    group: null,
    icon: 'content/save',
    toggle: false
};

module.exports.Button.initialState = {
    active: false
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

            :host-context(${ module.exports.elementName }.small) {
                margin: 0 4px;
            }
        `;
    }

    render () {
        return null
    }
};

module.exports.Divider.elementName = 'elementary-toolbar-divider';

module.exports.Label = class ToolbarLabel extends Component {

    get css () {
        return `
            :host-context(${ module.exports.elementName }.small) #label {
                position: relative;
                top: -1px;
                font-size: 11px;
                font-weight: 300;
            }

            #label {
                padding: 0 4px;
                font-weight: 600;
                color: white;
            }
        `;
    }

    render () {
        return [
            element('label', { id: 'label' }, this.text)
        ];
    }
};

module.exports.Label.elementName = 'elementary-toolbar-label';
