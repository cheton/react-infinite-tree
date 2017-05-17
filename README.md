# react-infinite-tree [![build status](https://travis-ci.org/cheton/react-infinite-tree.svg?branch=master)](https://travis-ci.org/cheton/react-infinite-tree) [![Coverage Status](https://coveralls.io/repos/github/cheton/react-infinite-tree/badge.svg?branch=master)](https://coveralls.io/github/cheton/react-infinite-tree?branch=master)

[![NPM](https://nodei.co/npm/react-infinite-tree.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-infinite-tree)

The [infinite-tree](https://github.com/cheton/infinite-tree) library for React.

Demo: http://cheton.github.io/react-infinite-tree

[![react-infinite-tree](https://raw.githubusercontent.com/cheton/react-infinite-tree/master/media/react-infinite-tree.gif)](http://cheton.github.io/react-infinite-tree)

## Features
* High performance infinite scroll with large data set
* [Customizable renderer](https://github.com/cheton/infinite-tree/wiki/Options#rowrenderer) to render the tree in any form
* [Load nodes on demand](https://github.com/cheton/infinite-tree/wiki/Options#loadnodes)
* Native HTML5 drag and drop API
* A rich set of [APIs](https://github.com/cheton/infinite-tree#api-documentation)

## Browser Support
![Chrome](https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png)<br>Chrome | ![Edge](https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png)<br>Edge | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png)<br>Firefox | ![IE](https://github.com/alrra/browser-logos/raw/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png)<br>IE | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/opera/opera_48x48.png)<br>Opera | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png)<br>Safari
--- | --- | --- | --- | --- | --- |
 Yes | Yes | Yes| 9+ | Yes | Yes | 

## Installation
```bash
npm install --save react react-dom infinite-tree
npm install --save react-infinite-tree
```

## Example
```jsx
import React from 'react';
import classNames from 'classnames';
import InfiniteTree from 'react-infinite-tree';
import 'react-infinite-tree/dist/react-infinite-tree.css';

const data = {
    id: 'fruit',
    name: 'Fruit',
    children: [{
        id: 'apple',
        name: 'Apple'
    }, {
        id: 'banana',
        name: 'Banana',
        children: [{
            id: 'cherry',
            name: 'Cherry',
            loadOnDemand: true
        }]
    }]
};

class App extends React.Component {
    tree = null;

    componentDidMount() {
        this.tree.loadData(data);

        // Select the first node
        this.tree.selectNode(this.tree.getChildNodes()[0]);
    }
    render() {
        return (
            <div>
                <InfiniteTree
                    ref={(c) => this.tree = c.tree}
                    autoOpen={true}
                    loadNodes={(parentNode, done) => {
                        const suffix = parentNode.id.replace(/(\w)+/, '');
                        const nodes = [
                            {
                                id: 'node1' + suffix,
                                name: 'Node 1'
                            },
                            {
                                id: 'node2' + suffix,
                                name: 'Node 2'
                            }
                        ];
                        setTimeout(() => {
                            done(null, nodes);
                        }, 1000);
                    }}
                    rowRenderer={(node, treeOptions) => {
                        const { id, name, loadOnDemand = false, children, state, props = {} } = node;
                        const droppable = treeOptions.droppable;
                        const { depth, open, path, total, selected = false } = state;
                        const more = node.hasChildren();

                        return (
                            <div
                                className={classNames(
                                    'infinite-tree-item',
                                    { 'infinite-tree-selected': selected }
                                )}
                                data-id={id}
                                droppable={droppable}
                            >
                                <div
                                    className="infinite-tree-node"
                                    style={{ marginLeft: depth * 18 }}
                                >
                                    {!more && loadOnDemand &&
                                        <a className={classNames(treeOptions.togglerClass, 'infinite-tree-closed')}>►</a>
                                    }
                                    {more && open &&
                                        <a className={classNames(treeOptions.togglerClass)}>▼</a>
                                    }
                                    {more && !open &&
                                        <a className={classNames(treeOptions.togglerClass, 'infinite-tree-closed')}>►</a>
                                    }
                                    <span className="infinite-tree-title">{name}</span>
                                </div>
                            </div>
                        );
                    }}
                    selectable={true}
                    shouldSelectNode={(node) => {
                        if (!node || (node === this.tree.getSelectedNode())) {
                            return false; // Prevent from deselecting the current node
                        }
                        return true;
                    }}
                    onClick={(event) => {
                        // click event
                        const target = event.target || event.srcElement; // IE8
                        console.log('click:', target);
                    }}
                    onDoubleClick={(event) => {
                        // dblclick event
                    }}
                    onKeyDown={(event) => {
                        // keydown event
                    }}
                    onKeyUp={(event) => {
                        // keyup event
                    }}
                    onCloseNode={(node) => {
                    }}
                    onOpenNode={(node) => {
                    }}
                    onSelectNode={(node) => {
                    }}
                    onWillCloseNode={(node) => {
                    }}
                    onWillOpenNode={(node) => {
                    }}
                    onWillSelectNode={(node) => {
                    }}
                    onClusterWillChange={() => {
                    }}
                    onClusterDidChange={() => {
                    }}
                    onContentWillUpdate={() => {
                    }}
                    onContentDidUpdate={() => {
                    }}
                />
            </div>
        );
    }
}
```

## API Documentation

Check out API documentation at [infinite-tree](https://github.com/cheton/infinite-tree/wiki):

* [Options](https://github.com/cheton/react-infinite-tree/wiki/Options)
* [Functions: Tree](https://github.com/cheton/react-infinite-tree/wiki/Functions:-Tree)
* [Functions: Node](https://github.com/cheton/react-infinite-tree/wiki/Functions:-Node)
* [Events](https://github.com/cheton/react-infinite-tree/wiki/Events)

## License

Copyright (c) 2016 Cheton Wu

Licensed under the [MIT License](LICENSE).
