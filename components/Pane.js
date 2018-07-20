const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

module.exports = class Pane extends Component {

    get css () {
        const { white, brand, foreground, highlight, darklight } = palette;
        const { connected, direction, grow, shrink, basis } = this;

        return `
            :host {
                display: flex;
                flex-basis: ${ basis };
                flex-grow: ${ grow };
                flex-shrink: ${ shrink };
                flex-direction: ${ direction };
            }

            #pane {
                display: flex;
                width: ${ this.width };
                height: ${ this.height };
                flex-grow: 1;
                flex-direction: column;
                padding: 4px;
                color: hsl(${ white[ 0 ] }, ${ white[ 1 ] }%, ${ white[ 2 ] }%);
                background: hsla(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%, 0.6);

                ${ !connected && `
                    box-shadow: inset 0 1px hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.66),
                                0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33);
                ` }
            }
        `;
    }

    render () {
        return (
            element('article', { id: 'pane' }, [
                element('slot')
            ])
        );
    }
};

module.exports.elementName = 'elementary-pane';

module.exports.defaultProperties = {
    connected: false,
    width: 'auto',
    height: 'auto',
    direction: 'column',
    grow: 0,
    shrink: 0,
    basis: 'auto'
};

module.exports.Split = class SplitPane extends Component {

    get css () {
    const { brand } = palette;
    const { direction, grow, shrink, basis } = this;

        return `
            :host {
                display: flex;
                flex-basis: ${ basis };
                flex-grow: ${ grow };
                flex-shrink: ${ shrink };
                flex-direction: ${ direction };
            }

            #split-pane {
                display: flex;
                flex-grow: 1;
                flex-direction: ${ direction };
            }

            .divider {
                position: relative;
                width: ${ direction === 'column' ? '100%' : '2px' };
                height: ${ direction === 'row' ? '100%' : '2px' };
                margin: ${ direction === 'column' ? '1px 0' : '0 1px' };
                transition: all .12s ease;
            }

            .divider:hover {
                background:  hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%);
                box-shadow: 0 0 5px 1px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.33);
            }

            .grip {
                position: absolute;
                top: ${ direction === 'column' ? '-5px' : '0' };
                right: ${ direction === 'row' ? '-5px' : '0' };
                bottom: ${ direction === 'column' ? '-5px' : '0' };
                left: ${ direction === 'row' ? '-5px' : '0' };
                cursor: ${ direction === 'column' ? 'ns-resize' : 'ew-resize' };
            }
        `
    }

    handleComponentRender () {
        for (let i = 0, count = this.children.length; i < count; i++) {
            this.children[ i ].slot = `pane-${ i }`;
        }

        this.state.set('slots', this.children.length);
    }

    handleGrip (index) {
        this.state.set('gripping', index);
    }

    render () {
        const slots = this.state.get('slots');
        const gripping = this.state.get('gripping');

        return (
            element('section', { id: 'split-pane' }, Array.from(Array(slots), (_, index) => [
                element('slot', { name: `pane-${ index }` }),
                (index < slots - 1) && (
                    element('div', { className: 'divider', }, [
                        element('div', { className: 'grip' })
                    ])
                )
            ]).reduce((a, b) => a.concat(b), [ ]))
        );
    }
};

module.exports.Split.elementName = 'elementary-pane-split';

module.exports.Split.defaultProperties = {
    direction: 'column',
    grow: 0,
    shrink: 0,
    basis: 'auto'
};

module.exports.Split.initialState = {
    slots: 0
};
