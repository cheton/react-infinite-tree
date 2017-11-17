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
```sh
npm install --save react-infinite-tree
```

## Example

### Tree

```jsx
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import InfiniteTree from '../src';
import TreeNode from './components/TreeNode';
import Toggler from './components/Toggler';
import Icon from './components/Icon';
import Clickable from './components/Clickable';
import Text from './components/Text';
import Label from './components/Label';
import Loading from './components/Loading';
import { generate } from './tree-generator';

const renderTreeNode = ({ node, tree, toggleState }) => (
    <TreeNode
        selected={node.state.selected}
        depth={node.state.depth}
        onClick={event => {
            tree.selectNode(node);
        }}
    >
        <Toggler
            state={toggleState}
            onClick={() => {
                if (toggleState === 'closed') {
                    tree.openNode(node);
                } else if (toggleState === 'opened') {
                    tree.closeNode(node);
                }
            }}
        />
        <Clickable>
            <Icon state={toggleState} />
            <Text>{node.name}</Text>
        </Clickable>
        {(node.loadOnDemand && node.children.length === 0 && !node.state.loading) &&
            <i className="fa fa-fw fa-ellipsis-v" />
        }
        {node.state.loading && <Loading />}
        <Label style={{ position: 'absolute', right: 5, top: 6 }}>
            {node.children.length}
        </Label>
    </TreeNode>
);

class Tree extends PureComponent {
    tree = null;
    data = generate(1000);

    componentDidMount() {
        // Select the first node
        this.tree.selectNode(this.tree.getChildNodes()[0]);
    }
    render() {
        return (
            <InfiniteTree
                ref={node => {
                    this.tree = node ? node.tree : null;
                }}
                style={{
                    border: '1px solid #ccc'
                }}
                autoOpen
                selectable
                tabIndex={0}
                data={this.data}
                width="100%"
                height={400}
                rowHeight={30}
                rowRenderer={({ node, tree }) => {
                    const hasChildren = node.hasChildren();
                    let toggleState = '';
                    if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                        toggleState = 'closed';
                    }
                    if (hasChildren && node.state.open) {
                        toggleState = 'opened';
                    }
                    return renderTreeNode({ node, tree, toggleState });
                }}
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
                shouldSelectNode={(node) => { // Defaults to null
                    if (!node || (node === this.tree.getSelectedNode())) {
                        return false; // Prevent from deselecting the current node
                    }
                    return true;
                }}
                onKeyUp={(event) => {
                    console.log('onKeyUp', event.target);
                }}
                onKeyDown={(event) => {
                    console.log('onKeyDown', event.target);
                    event.preventDefault();
                    const node = this.tree.getSelectedNode();
                    const nodeIndex = this.tree.getSelectedIndex();
                    if (event.keyCode === 37) { // Left
                        this.tree.closeNode(node);
                    } else if (event.keyCode === 38) { // Up
                        const prevNode = this.tree.nodes[nodeIndex - 1] || node;
                        this.tree.selectNode(prevNode);
                    } else if (event.keyCode === 39) { // Right
                        this.tree.openNode(node);
                    } else if (event.keyCode === 40) { // Down
                        const nextNode = this.tree.nodes[nodeIndex + 1] || node;
                        this.tree.selectNode(nextNode);
                    }
                }}
                onScroll={(scrollOffset, event) => {}}
                onContentWillUpdate={() => {}}
                onContentDidUpdate={() => {}}
                onOpenNode={(node) => {}}
                onCloseNode={(node) => {}}
                onSelectNode={(node) => {}}
                onWillOpenNode={(node) => {}}
                onWillCloseNode={(node) => {}}
                onWillSelectNode={(node) => {}}
            />
        );
    }
}

export default Tree;
```

### Components

https://github.com/cheton/react-infinite-tree/tree/master/examples/components

# API

### Properties

Name | Type | Default | Description
:--- | :--- | :------ | :----------
autoOpen | Boolean | false | Whether to open all nodes when tree is loaded.
selectable | Boolean | true | Whether or not a node is selectable in the tree.
tabIndex | Number | 0 | Specifies the tab order to make tree focusable.
data | Array or Object | [] | Tree data structure, or a collection of tree data structures.
width \* | Number or String | '100%' | Width of the tree.
height \* | Number or String | | Height of the tree.
rowHeight \* | Number, Array, or Function(index: Number): Number | | Either a fixed height, an array containing the heights of all the rows, or a function that returns the height of a row given its index.
rowRenderer | Function({ node: Node, tree: Tree }): React Node | | A row renderer for rendering a tree node.
loadNodes | Function(parentNode: Node, done: Function) | | Loads nodes on demand.
shouldSelectNode | Function(node: Node): Boolean | | Provides a function to determine if a node can be selected or deselected. The function must return `true` or `false`. This function will not take effect if `selectable` is not `true`.
scrollOffset | Number | | Controls the scroll offset.
scrollToIndex | Number | | Node index to scroll to.
onScroll | Function(scrollTop: Number, event: React.UIEvent) | | Callback invoked whenever the scroll offset changes.
onContentWillUpdate | Function() | | Callback invoked before updating the tree.
onContentDidUpdate | Function() | | Callback invoked when the tree is updated.
onOpenNode | Function(node: Node) | | Callback invoked when a node is opened.
onCloseNode | Function(node: Node) | | Callback invoked when a node is closed.
onSelectNode | Function(node: Node) | | Callback invoked when a node is selected or deselected.
onWillOpenNode | Function(node: Node) | | Callback invoked before opening a node.
onWillCloseNode | Function(node: Node) | | Callback invoked before closing a node.
onWillSelectNode | Function(node: Node) | | Callback invoked before selecting or deselecting a node.

### Tree Methods

https://github.com/cheton/react-infinite-tree/wiki/Functions:-Tree

### Node Methods

https://github.com/cheton/react-infinite-tree/wiki/Functions:-Node

## License

MIT
