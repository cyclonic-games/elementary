const Component = require('quark/core/Component');
const element = require('quark/core/element');

module.exports = class ElementaryFrame extends Component {

    get css () {
        return `
            #frame {
            
            }
            
            #bar {
            
            }
            
            #title {
            
            }
            
            #content {
            
            }
        `;
    }
    
    render () {
        return (
            element('section', { id: 'frame' }, [
                element('header', { id: 'bar' }, [
                    element('span', { id: 'title' }, this.title)
                ]),
                element('main', { id: 'content' }, [
                    element('slot')
                ])
            ])
        );
    }
};

module.exports.defaultProperties = {
    title: 'Elementary'
};

module.exports.initialState = {
    visible: true
};
