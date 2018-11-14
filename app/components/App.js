var React = require('react');
var Popular = require('./Popular');

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
                <p>hello world! and echo back!</p>
            </div>
            
        )
    }
}

module.exports = App;