const Component = require('quark/core/Component');
const element = require('quark/core/element');

module.exports = class Frame extends Component {

    get css () {
        return `
            #frame {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: calc(100%);
                font-family: Verdana, sans-serif;
                background: #252733;
                border: 1px solid black;
                border-radius: 5px;
                box-sizing: border-box;
            }
            
            #bar {
                display: flex;
                align-items: center;
                height: 36px;
                padding: 0 16px;
                font-size: 11px;
                color: white;
                background: black;
                border-radius: 4px 4px 0 0;
                -webkit-app-region: drag;
            }
            
            #title {
                flex-grow: 1;
            }
            
            #content {
                display: flex;
                flex-grow: 1;
                width: 100%;
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

module.exports.elementName = 'elementary-frame';

module.exports.defaultProperties = {
    title: 'Elementary'
};

module.exports.initialState = {
    visible: true
};
