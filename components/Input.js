const Component = require('quark/core/Component');
const element = require('quark/core/element');

const Icon = require('./Icon');
const palette = require('../core/palette');

class Input extends Component {

    get css () {
        const { highlight } = palette;

        return `
            :host {
                display: flex;
                height: 24px;

                ${ this.type === 'select' && `
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.18);
                ` }
            }

            input {
                flex-grow: 1;
                height: inherit;
                padding: 0 8px;
                font-family: inherit;
                font-size: 12px;
                color: white;
                border: none;
                outline: none;
                transition: all .12s ease;
            }

            #text {

            }

            #number {

            }

            #select {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
            }

            button {
                height: inherit;
                padding: 0 4px;
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                border: none;
                outline: none;
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
                transition: all .12s ease;
            }

            button ${ Icon.elementName } {
                position: relative;
                top: 1px;
            }

            #select:hover,
            :host(:hover) button {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] + 12 }%);
            }
        `;
    }

    render () {
        switch (this.type) {
            case 'text': return [

            ];
            case 'number': return [

            ];
            case 'select': return [
                element('input', { id: 'select', disabled: true, value: 'waterside-market' }),
                element('button', { id: 'select-button' }, [
                    element(Icon, { glyph: 'navigation/expand_more', size: 20, color: 'rgba(255, 255, 255, 0.75)' })
                ])
            ];
        }
    }
};

Input.elementName = 'elementary-input';

Input.defaultProperties = {
    type: 'text'
};

Input.Option = class InputOption extends Component {

};

Input.Option.elementName = 'elementary-input-option';

module.exports = Input;
