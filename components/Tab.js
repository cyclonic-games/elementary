const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

const Icon = require('./Icon');

module.exports = class Tab extends Component {

    get css () {
        return `
            :host {
                display: ${ this.state.get('active') ? 'flex' : 'none' };
                flex-grow: 1;
                flex-direction: column;
            }
        `;
    }

    render () {
        if (this.state.get('active')) {
            return element('slot')
        }
    }
};

module.exports.elementName = 'elementary-tab';

module.exports.defaultProperties = {
    align: 'start',
    icon: null,
    text: null
};

module.exports.initialState = {
    active: false
};

module.exports.Group = class TabGroup extends Component {

    get css () {
        const active = this.state.get('active');
        const { white, brand, foreground, highlight } = palette;

        return `
            :host {
                display: flex;
                flex-grow: 1;
            }

            #container {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                padding: 4px;
            }

            #divider {
                z-index: 1;
                height: 3px;
                background: hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%);
                box-shadow: 0 0 4px 1px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.33);
            }

            #tabs {
                display: flex;
            }

            #tabs button {
                display: flex;
                margin: 0 4px 0 0;
                padding: 8px 16px;
                font-size: inherit;
                font-family: inherit;
                color: hsl(${ white[ 0 ] }, ${ white[ 1 ] }%, ${ white[ 2 ] }%);
                background: hsl(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%);
                box-shadow: inset 0 1px hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
                border: none;
                outline: none;
                transition: .12s ease;
            }

            #tabs button:hover {
                background: hsl(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%);
            }

            #tabs #tab-${ active } {
                background: hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%);
                box-shadow: 0 0 4px 1px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.33);
            }

            #tabs #tab-${ active }:hover {
                background: hsl(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%);
            }

            #start {
                display: flex;
                flex-grow: 0;
            }

            #end {
                display: flex;
                flex-grow: 1;
                justify-content: flex-end;
            }

            #tabs #end button {
                margin: 0 0 0 4px;
            }

            #content {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
            }
        `;
    }

    handleComponentConnect () {
        this.tabs = Array.from(this.children).map(tab => ({
            align: tab.align,
            icon: tab.icon,
            name: tab.name,
            text: tab.text
        }));

        this.children[ 0 ].state.set('active', true);
    }

    activate (index) {
        for (const tab of this.children) {
            tab.state.set('active', false);
        }

        this.state.set('active', index);
        this.children[ index ].state.set('active', true);
    }

    render () {
        const start = this.tabs.filter(tab => tab.align === 'start');
        const end = this.tabs.filter(tab => tab.align === 'end');

        return (
            element('section', { id: 'container' }, [
                element('header', { id: 'tabs' }, [
                    element('section', { id: 'start' }, start.map((tab, i) => (
                        element('button', { id: `tab-${ i }`, onclick: () => this.activate(i) }, [
                            tab.icon ? element(Icon, { glyph: tab.icon, color: 'white' }) : element('span', null, tab.text)
                        ])
                    ))),
                    element('section', { id: 'end' }, end.map((tab, i) => (
                        element('button', { id: `tab-${ start.length + i }`, onclick: () => this.activate(start.length + i) }, [
                            tab.icon ? element(Icon, { glyph: tab.icon, color: 'white' }) : element('span', null, tab.text)
                        ])
                    )))
                ]),
                element('div', { id: 'divider' }),
                element('section', { id: 'content' }, [
                    element('slot')
                ])
            ])
        )
    }
}

module.exports.Group.elementName = 'elementary-tab-group';

module.exports.Group.initialState = {
    active: 0
};
