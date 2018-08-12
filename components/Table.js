const Component = require('quark/core/Component');
const element = require('quark/core/element');

const Pane = require('./Pane');

const palette = require('../core/palette');

class Table extends Component {

    get css () {
        const { foreground, darklight } = palette;

        return `
            :host {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
            }

            #table {
                display: grid;
                grid-template: auto / ${ this.columns.map(() => 'auto').join(' ') };
                grid-gap: 0px 1px;
            }

            .header {
                padding: 6px 12px;
                font-weight: 600;
                background: hsla(${ darklight[ 0 ] }, ${ darklight[ 1 ] }%, ${ darklight[ 2 ] }%, 0.48);
            }
        `;
    }

    handleComponentReady () {
        const rows = Array.from(this.children).filter(row => row instanceof Table.Row);

        for (const row of rows) Array.from(row.children).forEach((cell, i) => {
            cell.index = i;
            cell.row = row;

            cell.addEventListener('mouseenter', e => this.handleMouseEnter(e));
            cell.addEventListener('mouseleave', e => this.handleMouseLeave(e));
            cell.addEventListener('click', e => this.handleClick(e));

            this.appendChild(cell);
            row.remove();
        });
    }

    handleMouseEnter (event) {
        const cell = event.target;
        const cells = Array.from(this.children);
        const row = Array.from(this.children).filter(c => c.row === cell.row);

        for (const cell of cells) cell.state.set('highlight', false);
        for (const cell of row) cell.state.set('highlight', true);
    }

    handleMouseLeave (event) {
        const cell = event.target;
        const cells = Array.from(this.children);

        for (const cell of cells) cell.state.set('highlight', false);
    }

    handleClick (event) {
        const cell = event.target;
        const cells = Array.from(this.children);
        const row = Array.from(this.children).filter(c => c.row === cell.row);

        for (const cell of cells) cell.state.set('selected', false);
        for (const cell of row) cell.state.set('selected', true);

        this.state.set('selection', cell.row);
    }

    render () {
        return [
            element('section', { id: 'table' }, this.columns.map((column, i) => (
                element('header', { className: 'header' }, column)
            )).concat([
                element('slot')
            ]))
        ];
    }
};

Table.elementName = 'elementary-table';

Table.defaultProperties = {
    columns: [ ]
};

Table.Row = class TableRow extends Component {

    get css () {
        return `
            :host {
                display: flex;
                width: 100%;
            }
        `;
    }

    render () {
        return element('slot');
    }
};

Table.Row.elementName = 'elementary-table-row';

Table.Cell = class TableCell extends Component {

    get css () {
        const { brand, foreground, highlight } = palette;
        const hover = this.state.get('highlight');
        const selected = this.state.get('selected');

        return `
            :host {
                z-index: 0;
                padding: 4px 12px;
                color: ${ selected ? 'white' : 'rgba(255, 255, 255, 0.75)' };
                background: ${ hover ? `hsla(${ highlight[ 0 ] }, ${ highlight[ 1 ] }%, ${ highlight[ 2 ] }%, 0.18)` : 'none' };
                background-clip: padding-box;
                border-bottom: 1px solid hsla(${ foreground[ 0 ] }, ${ foreground[ 1 ] }%, ${ foreground[ 2 ] }%, 0.6);
                transition: all .12s ease;

                ${ selected && `
                    z-index: 1;
                    background: hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.25);
                    border-bottom: 1px solid transparent;
                    box-shadow: 0 1px 0 hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 1),
                                0 -1px 0 hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 1),
                                0 0 5px hsla(${ brand[ 0 ] }, ${ brand[ 1 ] }%, ${ brand[ 2 ] }%, 0.2);
                ` }
        `;
    }

    render () {
        return element('div', { id: 'cell' }, [
            element('slot')
        ]);
    }
};

Table.Cell.elementName = 'elementary-table-cell';

Table.Cell.defaultProperties = {
    index: -1,
    row: null
};

module.exports = Table;
