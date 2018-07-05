const fs = require('fs');

const Component = require('quark/core/Component');
const element = require('quark/core/element');

const icons = `${ process.cwd() }/node_modules/material-design-icons`;

module.exports = class Icon extends Component {

    get css () {
        return `
            :host {
                line-height: 0;
            }

            #icon {
                display: inline-block;
                margin: 0;
                padding: 0;
                font-style: normal;
            }

            svg {
                width: ${ this.size }px;
                height: ${ this.size }px;
                fill: ${ this.color };
            }
        `;
    }

    render () {
        const [ category, which ] = this.glyph.split('/');
        const glyph = fs.readFileSync(`${ icons }/${ category }/svg/production/ic_${ which }_48px.svg`);

        return (
            element('i', { id: 'icon', className: 'material-icons', innerHTML: glyph })
        );
    }
};

module.exports.elementName = 'elementary-icon';

module.exports.defaultProperties = {
    glyph: 'foo/bar',
    size: 24,
    color: 'black'
};
