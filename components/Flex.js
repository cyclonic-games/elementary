const Component = require('quark/core/Component');
const element = require('quark/core/element');

module.exports = class Flex extends Component {

    get css () {
        return `
            :host {
                display: flex;
                flex-grow: 1;
            }
            
            #flex {
                display: flex;
                flex-grow: 1;
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
}
