import React, { PureComponent } from 'react';
import Tree from './tree';
import Preview from './preview';

class App extends PureComponent {
    state = {
        node: null
    };

    onUpdate = (node) => {
        this.setState({ node: node });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <Tree onUpdate={this.onUpdate} />
                    </div>
                    <div className="col-xs-6">
                        <Preview node={this.state.node} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
