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

#### Tree.jsx
```jsx
<InfiniteTree
    ref={node => {
        this.tree = node ? node.tree : null;
    }}
    style={{
        border: '1px solid #ccc'
    }}
    data={this.data}
    width="100%"
    height={400}
    rowHeight={30}
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
    selectable={true} // Defaults to true
    shouldSelectNode={(node) => { // Defaults to null
        if (!node || (node === this.tree.getSelectedNode())) {
            return false; // Prevent from deselecting the current node
        }
        return true;
    }}
    onKeyDown={(event) => {
        const target = event.target || event.srcElement; // IE8
        console.log('onKeyDown', target);
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
>
{({ node, tree }) => {
    const { id, name, loadOnDemand = false, children, state, props = {} } = node;
    const { depth, open, path, total, loading = false, selected = false } = state;
    const childrenLength = Object.keys(children).length;
    const more = node.hasChildren();

    let togglerState = '';
    if ((!more && loadOnDemand) || (more && !open)) {
        togglerState = 'collapsed';
    }
    if (more && open) {
        togglerState = 'expanded';
    }

    let iconState = '';
    if (more && open) {
        iconState = 'folder-open';
    }
    if (more && !open) {
        iconState = 'folder';
    }
    if (!more) {
        iconState = 'file';
    }

    return (
        <TreeNode
            selected={selected}
            depth={depth}
            onClick={event => {
                tree.selectNode(node);
            }}
        >
            <Toggler
                state={togglerState}
                onClick={() => {
                    if (togglerState === 'collapsed') {
                        tree.openNode(node);
                    } else if (togglerState === 'expanded') {
                        tree.closeNode(node);
                    }
                }}
            />
            <PointerCursor>
                <Icon state={iconState} />
                <Text>{name}</Text>
            </PointerCursor>
        </TreeNode>
    );
}}
</InfiniteTree>
```

#### render.jsx
```jsx
import React from 'react';
import styled from 'styled-components';

const rowHeight = 30;

export const TreeNode = styled.div`
    cursor: default;
    position: relative;
    line-height: ${rowHeight - 2}px;
    background: ${props => props.selected ? '#deecfd' : 'transparent'};
    border: ${props => props.selected ? '1px solid #06c' : '1px solid transparent'};
    &:hover {
        background: #f2fdff;
    }
    padding-left: ${props => props.depth * 18}px;
`;

export const Toggler = styled(({ state, ...props }) => (
    <a {...props}>
        {(state === 'expanded') &&
        <i className="fa fa-fw fa-chevron-right" />
        }
        {(state === 'collapsed') &&
        <i className="fa fa-fw fa-chevron-down" />
        }
    </a>
))`
    color: #333;
    display: inine-block;
    text-align: center;
    margin-right: 2px;
`;

export const Icon = ({ state, ...props }) => (
    <span {...props}>
        {(state === 'folder-open') &&
        <i className="fa fa-fw fa-folder-open-o" />
        }
        {(state === 'folder') &&
        <i className="fa fa-fw fa-folder-o" />
        }
        {(state === 'file') &&
        <i className="fa fa-fw fa-file-o" />
        }
    </span>
);

export const PointerCursor = styled.div`
    display: inline-block;
    cursor: pointer;
`;

export const Text = styled.span`
    margin-left: 0 2px;
    user-select: none;
`;
```

## API Documentation

Check out API documentation at [infinite-tree](https://github.com/cheton/infinite-tree/wiki):

* [Options](https://github.com/cheton/react-infinite-tree/wiki/Options)
* [Functions: Tree](https://github.com/cheton/react-infinite-tree/wiki/Functions:-Tree)
* [Functions: Node](https://github.com/cheton/react-infinite-tree/wiki/Functions:-Node)
* [Events](https://github.com/cheton/react-infinite-tree/wiki/Events)

## License

MIT
