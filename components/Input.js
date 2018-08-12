const Component = require('quark/core/Component');
const element = require('quark/core/element');

const Flex = require('./Flex');
const Icon = require('./Icon');
const palette = require('../core/palette');

class Input extends Component {

    get css () {
        const { background, brand, highlight } = palette;

        return `
            :host {
                display: block;
                flex-grow: 1;

                ${ this.type === 'select' && `
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.18);
                ` }
            }

            label {
                display: inline-block;
                padding: 0 0 0 4px;
                line-height: 20px;
                font-size: 10px;
                font-weight: 600;
            }

            input {
                flex-grow: 1;
                width: 100%;
                height: 24px;
                padding: 0 8px;
                font-family: inherit;
                font-size: 12px;
                color: white;
                border: none;
                outline: none;
                box-sizing: border-box;
                transition: all .12s ease;
            }

            #text,
            #number {
                background: hsla(${ background[ 0 ] }, ${ background[ 1 ] }%, ${ background[ 2 ] }%, 0.5);
                box-shadow: inset 0 4px 12px 1px rgba(0, 0, 0, 0.12),
                            inset 0 0 0 1px hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.75);
            }

            #text:focus,
            #number:focus {
                box-shadow: inset 0 4px 12px 1px rgba(0, 0, 0, 0.12),
                            inset 0 0 0 1px hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%);
            }

            #select {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
            }

            button {
                height: 24px;
                padding: 0 4px;
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                border: none;
                outline: none;
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
                transition: all .12s ease;
            }

            button:hover {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
            }

            button ${ Icon.elementName } {
                position: relative;
                top: 1px;
            }

            #select:hover,
            :host(:hover) #select-button {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
            }
        `;
    }

    render () {
        switch (this.type) {
            case 'text': return [
                this.label && (
                    element('label', { htmlFor: 'text' }, this.label)
                ),
                element('input', { id: 'text' })
            ];
            case 'number': return [
                this.label && (
                    element('label', { htmlFor: 'number' }, this.label)
                ),
                element('input', { id: 'number' })
            ];
            case 'select': return [
                this.label && (
                    element('label', { htmlFor: 'select' }, this.label)
                ),
                element(Flex, { grow: 1 }, [
                    element('input', { id: 'select', disabled: true, value: 'waterside-market' }),
                    element('button', { id: 'select-button' }, [
                        element(Icon, { glyph: 'navigation/expand_more', size: 20, color: 'rgba(255, 255, 255, 0.75)' })
                    ])
                ])
            ];
        }
    }
};

Input.elementName = 'elementary-input';

Input.defaultProperties = {
    label: '',
    type: 'text'
};

Input.Group = class InputGroup extends Component {

    get css () {
        const { highlight } = palette;

        return `
            :host {
                display: block;
            }

            #group {
                position: relative;
                margin: 16px 0;
                padding: 8px;
                border: 1px solid hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                border-top: none;
            }

            #header {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                display: flex;
            }

            #label {
                flex-grow: 0;
                flex-shrink: 1;
                line-height: 0;
                font-weight: 600;
            }

            #div-left {
                width: 8px;
                margin-right: 4px;
                border-bottom: 1px solid hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
            }

            #div-right {
                flex-grow: 1;
                margin-left: 4px;
                border-bottom: 1px solid hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
            }
        `;
    }

    render () {
        return [
            element('section', { id: 'group' }, [
                element('header', { id: 'header' }, [
                    element('div', { id: 'div-left' }),
                    element('span', { id: 'label' }, this.label),
                    element('div', { id: 'div-right' })
                ]),
                element(Flex, { grow: 1 }, [
                    element('slot')
                ])
            ])
        ];
    }
};

Input.Group.elementName = 'elementary-input-group';

Input.Group.defaultProperties = {
    label: ''
};

Input.Option = class InputOption extends Component {

};

Input.Option.elementName = 'elementary-input-option';

module.exports = Input;
