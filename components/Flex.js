const Component = require('quark/core/Component');
const element = require('quark/core/element');

module.exports = class Flex extends Component {

    get css () {
        return `
            :host {
                display: flex;
                flex-grow: ${ this.grow };
                flex-shrink: ${ this.shrink };
                flex-basis: ${ this.basis };

                ${ this.shrink && this.basis && `
                    width: ${ this.basis };
                ` }
            }

            #flex {
                display: flex;
                flex-grow: ${ this.grow };
                flex-shrink: ${ this.shrink };
                flex-basis: ${ this.basis };
                flex-direction: ${ this.direction };
                justify-content: ${ this.justify };
                width: 0;
            }
        `;
    }

    render () {

        return (
            element('section', { id: 'flex' }, [
                element('slot')
            ])
        )
    }
};

module.exports.elementName = 'elementary-flex'

module.exports.defaultProperties = {
    grow: 0,
    shrink: 0,
    basis: 'auto',
    direction: 'row',
    justify: 'flex-start'
};
