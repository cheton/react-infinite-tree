import React, { PureComponent } from 'react';
import Tree from './Tree';
import Preview from './Preview';
import debounce from 'lodash.debounce';

class App extends PureComponent {
    state = {
        node: null,
        filterText: '',
        caseSensitive: false,
        exactMatch: false,
        includeAncestors: true,
        includeDescendants: true
    };

    textFilter = null;

    treeRef = React.createRef();

    changeCheckedState = (key) => (event) => {
        const checked = event.target.checked;

        this.setState({
            [key]: checked
        }, () => {
            this.filter();
        });
    };

    onUpdate = (node) => {
        this.setState({ node: node });
    };

    filter = (keyword) => {
        const { tree } = this.treeRef.current;

        if (!tree) {
            return;
        }

        keyword = keyword || this.textFilter.value || '';

        if (!keyword) {
            tree.unfilter();
            return;
        }

        const {
            caseSensitive,
            exactMatch,
            includeAncestors,
            includeDescendants
        } = this.state;

        tree.filter(keyword, {
            filterPath: 'name',
            caseSensitive: caseSensitive,
            exactMatch: exactMatch,
            includeAncestors: includeAncestors,
            includeDescendants: includeDescendants
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4>Filter</h4>
                        <input
                            ref={node => {
                                this.textFilter = node;
                            }}
                            type="text"
                            className="form-control"
                            name="text-filter"
                            placeholder="Type to filter by text"
                            onKeyUp={(event) => {
                                event.persist();

                                const { keyCode } = event;
                                const BACKSPACE = 8;
                                const DELETE = 46;
                                const ENTER = 13;

                                if ([BACKSPACE, DELETE, ENTER].includes(keyCode)) {
                                    this.filter();
                                }
                            }}
                            onKeyPress={debounce((event) => {
                                this.filter();
                            }, 250)}
                        />
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="checkbox" style={{ margin: '5px 0' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="case-sensitive"
                                            checked={this.state.caseSensitive}
                                            onChange={this.changeCheckedState('caseSensitive')}
                                        />
                                        Case-sensitive
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="checkbox" style={{ margin: '5px 0' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="exact-match"
                                            checked={this.state.exactMatch}
                                            onChange={this.changeCheckedState('exactMatch')}
                                        />
                                        Exact match
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="checkbox" style={{ margin: '5px 0' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="include-ancestors"
                                            checked={this.state.includeAncestors}
                                            onChange={this.changeCheckedState('includeAncestors')}
                                        />
                                        Include ancestors
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="checkbox" style={{ margin: '5px 0' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="include-descendants"
                                            checked={this.state.includeDescendants}
                                            onChange={this.changeCheckedState('includeDescendants')}
                                        />
                                        Include descendants
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <Tree
                            ref={this.treeRef}
                            onUpdate={this.onUpdate}
                        />
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
