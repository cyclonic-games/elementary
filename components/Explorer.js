const Component = require('quark/core/Component');
const element = require('quark/core/element');

const palette = require('../core/palette');

const Icon = require('./Icon');

const types = {
    'application/javascript': 'action/code',
    'application/json': 'action/settings_applications',
    'text/plain': 'action/description'
};

class Explorer extends Component {

    get css () {
        const { foreground, highlight } = palette;

        return `
            :host {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
            }

            #explorer {
                display: flex;
                flex-grow: 1;
                flex-wrap: wrap;
                padding: 8px;
            }
        `;
    }

    render () {
        return [
            element('article', { id: 'explorer' }, [
                element('slot')
            ])
        ]
    }
};

Explorer.elementName = 'elementary-explorer';

Explorer.defaultProperties = {
    location: '/'
};

Explorer.Directory = class ExplorerDirectory extends Component {

    get css () {
        const { brand, darklight, highlight } = palette;
        const selected = this.state.get('selected');

        return `
            :host {
                display: flex;
                width: 96px;
                height: 96px;
                margin: 8px;
                transition: all .12s ease;

                ${ selected && `
                    background: hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.25) !important;
                    box-shadow: inset 0 0 0 1px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 1),
                                0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33),
                                0 0 5px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.33);
                ` }
            }

            :host(:hover) {
                background: hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.18);
            }

            #directory {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            }

            #name {
                font-size: 11px;
                color: white;
            }
        `;
    }

    handleClick () {
        this.state.set('selected', !this.state.get('selected'));
    }

    render () {
        const selected = this.state.get('selected');

        return [
            element('p', { id: 'directory', onclick: e => this.handleClick(e) }, [
                element(Icon, { glyph: 'file/folder_open', size: 48, color: selected ? 'white' : 'rgba(255, 255, 255, 0.75)' }),
                element('label', { id: 'name' }, this.name)
            ])
        ];
    }
};

Explorer.Directory.elementName = 'elementary-explorer-directory';

Explorer.Directory.defaultProperties = {
    name: 'new directory'
};

Explorer.Directory.initialState = {
    selected: false
};

Explorer.File = class ExplorerFile extends Component {

    get css () {
        const { brand, darklight, highlight } = palette;
        const selected = this.state.get('selected');

        return `
            :host {
                display: flex;
                width: 96px;
                height: 96px;
                margin: 8px;
                transition: all .12s ease;

                ${ selected && `
                    background: hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.25) !important;
                    box-shadow: inset 0 0 0 1px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 1),
                                0 0 4px hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.33),
                                0 0 5px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.33);
                ` }
            }

            :host(:hover) {
                background: hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.18);
            }

            #file {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            }

            #name {
                font-size: 11px;
                color: white;
            }
        `;
    }

    handleClick () {
        this.state.set('selected', !this.state.get('selected'));
    }

    render () {
        const selected = this.state.get('selected');

        return [
            element('p', { id: 'file', onclick: e => this.handleClick(e) }, [
                element(Icon, { glyph: Explorer.File.types[ this.type ], size: 48, color: selected ? 'white' : 'rgba(255, 255, 255, 0.75)' }),
                element('label', { id: 'name' }, this.name)
            ])
        ];
    }
};

Explorer.File.elementName = 'elementary-explorer-file';

Explorer.File.defaultProperties = {
    meta: null,
    name: 'new file',
    type: 'text/plain'
};

Explorer.File.initialState = {
    selected: false
};

Explorer.File.types = types;

module.exports = Explorer;
