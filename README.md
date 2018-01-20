# react-infinite-tree [![build status](https://travis-ci.org/cheton/react-infinite-tree.svg?branch=master)](https://travis-ci.org/cheton/react-infinite-tree) [![Coverage Status](https://coveralls.io/repos/github/cheton/react-infinite-tree/badge.svg?branch=master)](https://coveralls.io/github/cheton/react-infinite-tree?branch=master)

[![NPM](https://nodei.co/npm/react-infinite-tree.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-infinite-tree)

The [infinite-tree](https://github.com/cheton/infinite-tree) library for React.

Demo: http://cheton.github.io/react-infinite-tree

[![react-infinite-tree](https://raw.githubusercontent.com/cheton/react-infinite-tree/master/media/react-infinite-tree.gif)](http://cheton.github.io/react-infinite-tree)

## Features
* High performance infinite scroll with large data set
* [Customizable renderer](https://github.com/cheton/react-infinite-tree#rendering-tree-nodes) to render the tree in any form
* [Load nodes on demand](https://github.com/cheton/infinite-tree/wiki/Options#loadnodes)
* Native HTML5 drag and drop API
* A rich set of [APIs](https://github.com/cheton/react-infinite-tree#api)

## Browser Support
![Chrome](https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png)<br>Chrome | ![Edge](https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png)<br>Edge | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png)<br>Firefox | ![IE](https://github.com/alrra/browser-logos/raw/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png)<br>IE | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/opera/opera_48x48.png)<br>Opera | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png)<br>Safari
--- | --- | --- | --- | --- | --- |
 Yes | Yes | Yes| 9+ | Yes | Yes | 

## Installation
```sh
npm install --save react-infinite-tree
```

## Usage

### Tree Structure

A tree structure can either be a node object or an array of node objects, and each node should have a unique `id`. Note that `id`, `state`, `children`, and `parent` are reserved keys for defining a node. See below for a basic tree structure:

```js
{
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
}
```

### Rendering Tree Nodes

You can use `rowRenderer` or pass a child function for rendering tree nodes. The child function will be supplied with the following properties:

* `tree` - https://github.com/cheton/infinite-tree/wiki/Functions:-Tree
* `node` - https://github.com/cheton/infinite-tree/wiki/Functions:-Node


```jsx
import React from 'react';
import InfiniteTree from 'react-infinite-tree';

export default (props) => (
    <InfiniteTree
        width="100%"
        height={400}
        rowHeight={30}
        data={props.data}
    >
    {({ node, tree }) => {
        // Determine the toggle state
        let toggleState = '';
        const hasChildren = node.hasChildren();
        if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
            toggleState = 'closed';
        }
        if (hasChildren && node.state.open) {
            toggleState = 'opened';
        }
        
        return (
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
                <span>{node.name}</span>
            </TreeNode>
        );
    }}
    </InfiniteTree>
);
```

### Components

#### TreeNode Component

```jsx
import React from 'react';
import styled from 'styled-components';

const defaultRowHeight = 30;

const TreeNode = styled.div`
    cursor: default;
    position: relative;
    line-height: ${({ rowHeight = defaultRowHeight }) => rowHeight - 2}px;
    background: ${props => props.selected ? '#deecfd' : 'transparent'};
    border: ${props => props.selected ? '1px solid #06c' : '1px solid transparent'};
    padding-left: ${props => props.depth * 18}px;
    .dropdown {
        visibility: hidden;
    }
    &:hover {
        background: #f2fdff;
        .dropdown {
            visibility: inherit;
        }
    }
`;

export default TreeNode;
```

#### Toggler Component

```jsx
import React from 'react';
import styled from 'styled-components';

const Toggler = styled(({ state, ...props }) => (
    <a {...props}>
        {(state === 'closed') &&
        <i className="fa fa-fw fa-chevron-right" />
        }
        {(state === 'opened') &&
        <i className="fa fa-fw fa-chevron-down" />
        }
    </a>
))`
    color: #333;
    display: inline-block;
    text-align: center;
    margin-right: 2px;
`;

export default Toggler;
```

## Example

https://github.com/cheton/react-infinite-tree/blob/master/examples/Tree.jsx

#### TreeNode
https://github.com/cheton/react-infinite-tree/blob/master/examples/components/TreeNode.jsx

#### Toggler
https://github.com/cheton/react-infinite-tree/blob/master/examples/components/Toggler.jsx

# API

### Properties

Name | Type | Default | Description
:--- | :--- | :------ | :----------
autoOpen | Boolean | false | Whether to open all nodes when tree is loaded.
selectable | Boolean | true | Whether or not a node is selectable in the tree.
tabIndex | Number | 0 | Specifies the tab order to make tree focusable.
data | Array or Object | [] | Tree data structure, or a collection of tree data structures.
width | Number or String | '100%' | The tree width. It can be a number or string like "auto" or "100%".
height | Number | | The tree height. Setting 100% height is currently not supported. See https://github.com/cheton/react-infinite-tree/issues/8.
rowHeight \* | Number, Array, or Function({ node: Node, tree: Tree, index: Number }): Number | | Either a fixed height, an array containing the heights of all the rows, or a function that returns the height of the given node.
rowRenderer | Function({ node: Node, tree: Tree, index: Number }): React Node | | A row renderer for rendering a tree node.
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

https://github.com/cheton/infinite-tree/wiki/Functions:-Tree

### Node Methods

https://github.com/cheton/infinite-tree/wiki/Functions:-Node

### Node State

Name | Type | Description
:--- | :--- | :----------
depth | Number | The depth of a node.
open | Boolean | Whether the node is expanded.
path | String | A unique path string representing a node.
prefixMask | String | The prefix mask.
total | Number | The total number of child nodes.

#### Flat Tree Structure

https://github.com/cheton/flattree/blob/master/examples/tree1.js

```
<root>: path=".0", parent="", children=2, total=11, depth=0, prefix="0", open=1, lastChild=1
Alpha: path=".0.0", parent=".0", children=0, total=0, depth=1, prefix="00", open=0, lastChild=0
Bravo: path=".0.1", parent=".0", children=3, total=9, depth=1, prefix="00", open=1, lastChild=1
Charlie: path=".0.1.0", parent=".0.1", children=2, total=4, depth=2, prefix="000", open=1, lastChild=0
Delta: path=".0.1.0.0", parent=".0.1.0", children=2, total=2, depth=3, prefix="0001", open=1, lastChild=0
Echo: path=".0.1.0.0.0", parent=".0.1.0.0", children=0, total=0, depth=4, prefix="00011", open=0, lastChild=0
Foxtrot: path=".0.1.0.0.1", parent=".0.1.0.0", children=0, total=0, depth=4, prefix="00011", open=0, lastChild=1
Golf: path=".0.1.0.1", parent=".0.1.0", children=0, total=0, depth=3, prefix="0001", open=0, lastChild=1
Hotel: path=".0.1.1", parent=".0.1", children=1, total=2, depth=2, prefix="000", open=1, lastChild=0
India: path=".0.1.1.0", parent=".0.1.1", children=1, total=1, depth=3, prefix="0001", open=1, lastChild=1
Juliet: path=".0.1.1.0.0", parent=".0.1.1.0", children=0, total=0, depth=4, prefix="00010", open=0, lastChild=1
Kilo: path=".0.1.2", parent=".0.1", children=0, total=0, depth=2, prefix="000", open=0, lastChild=1
```

## License

MIT
