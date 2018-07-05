const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Frame extends Component {

    get css () {
        const { red, green, yellow, external } = palette;

        return `
            :host {
                width: 100%;
                height: 100%;
            }

            #frame {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                font-size: 12px;
                font-family: Open Sans;
                font-weight: 300;
                box-sizing: border-box;
            }

            #bar {
                display: flex;
                align-items: center;
                height: 36px;
                padding: 0 16px;
                font-size: 12px;
                word-spacing: 2px;
                text-transform: uppercase;
                color: white;
                background: hsla(${ external[ 0 ] }, ${ external[ 1 ] }%, ${ external[ 2 ] }%, 0.93);
                border-radius: 6px 6px 0 0;
                -webkit-app-region: drag;
            }

            #title {
                position: relative;
                right: calc(-12px * 3);
                display: flex;
                flex-grow: 1;
                justify-content: center;
            }

            #controls {
                z-index: 1;
                display: flex;
                margin: 0;
                padding: 0;
                list-style: none;
                -webkit-app-region: no-drag;
            }

            #controls button {
                display: block;
                width: 12px;
                height: 12px;
                margin-left: 10px;
                padding: 0;
                background: none;
                border: none;
                border-radius: 100%;
                outline: none;
                transition: background .12s ease;
            }

            #controls #close {
                box-shadow: inset 0 0 0 1px hsl(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%),
                            inset 0 0 4px 3px hsla(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%, 0.2),
                            0 0 7px 1px hsla(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%, 0.4);
            }

            #controls #close:hover {
                background: hsl(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%);
                box-shadow: inset 0 0 0 1px hsl(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%),
                            inset 0 0 4px 4px hsla(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%, 0.2),
                            0 0 8px 2px hsla(${ red[ 0 ] }, ${ red[ 1 ] }%, ${ red[ 2 ] }%, 0.6);
            }

            #controls #maximize {
                box-shadow: inset 0 0 0 1px hsl(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%),
                            inset 0 0 4px 2px hsla(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%, 0.2),
                            0 0 7px 1px hsla(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%, 0.28);
            }

            #controls #maximize:hover {
                background: hsl(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%);
                box-shadow: inset 0 0 0 1px hsl(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%),
                            inset 0 0 4px 4px hsla(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%, 0.2),
                            0 0 8px 2px hsla(${ green[ 0 ] }, ${ green[ 1 ] }%, ${ green[ 2 ] }%, 0.5);
            }

            #controls #minimize {
                box-shadow: inset 0 0 0 1px hsl(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%),
                            inset 0 0 4px 2px hsla(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%, 0.2),
                            0 0 7px 1px hsla(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%, 0.28);
            }

            #controls #minimize:hover {
                background: hsl(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%);
                box-shadow: inset 0 0 0 1px hsl(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%),
                            inset 0 0 4px 4px hsla(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%, 0.2),
                            0 0 8px 2px hsla(${ yellow[ 0 ] }, ${ yellow[ 1 ] }%, ${ yellow[ 2 ] }%, 0.5);
            }

            #content {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                width: calc(100% - 2px);
                color: white;
                background: rgba(37, 39, 51, 0.93);
                border: 1px solid rgba(0, 0, 0, 0.33);
                border-top: none;
                border-radius: 0 0 6px 6px;
            }
        `;
    }

    render () {
        return (
            element('section', { id: 'frame' }, [
                element('header', { id: 'bar' }, [
                    element('span', { id: 'title' }, this.name),
                    element('ul', { id: 'controls' }, [
                        element('li', null, [
                            element('button', { id: 'minimize' })
                        ]),
                        element('li', null, [
                            element('button', { id: 'maximize' })
                        ]),
                        element('li', null, [
                            element('button', { id: 'close' })
                        ])
                    ])
                ]),
                element('main', { id: 'content' }, [
                    element('slot')
                ])
            ])
        );
    }
};

module.exports.elementName = 'elementary-frame';

module.exports.defaultProperties = {
    name: 'Elementary'
};

module.exports.initialState = {
    visible: true
};
