import Checkbox from '@trendmicro/react-checkbox';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InfiniteTree from '../src';
import TreeNode from './components/TreeNode';
import Toggler from './components/Toggler';
import Icon from './components/Icon';
import Clickable from './components/Clickable';
import Text from './components/Text';
import Label from './components/Label';
import Loading from './components/Loading';
import { generate } from './tree-generator';

const renderTreeNode = ({ node, tree, toggleState, onUpdate }) => (
    <TreeNode
        selected={node.state.selected}
        depth={node.state.depth}
        onClick={(event) => {
            tree.selectNode(node);
        }}
    >
        <Toggler
            state={toggleState}
            onClick={(event) => {
                event.stopPropagation();

                if (toggleState === 'closed') {
                    tree.openNode(node);
                } else if (toggleState === 'opened') {
                    tree.closeNode(node);
                }
            }}
        />
        <Checkbox
            checked={node.state.checked}
            indeterminate={node.state.indeterminate}
            onClick={(event) => {
                event.stopPropagation();
            }}
            onChange={(event) => {
                tree.checkNode(node);
                onUpdate(node);
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
        <Dropdown
            style={{ position: 'absolute', right: 20, top: 4 }}
            pullRight
        >
            <Dropdown.Toggle
                noCaret
                btnSize="xs"
                btnStyle="link"
                style={{ padding: 0 }}
            >
                <i className="dropdown fa fa-fw fa-cog" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <MenuItem>{node.name}</MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    </TreeNode>
);

class Tree extends Component {
    static propTypes = {
        onUpdate: PropTypes.func
    };

    treeRef = React.createRef();
    tree = null;

    data = generate(1000);

    componentDidMount() {
        const { tree } = this.treeRef.current;

        // Select the first node
        tree.selectNode(tree.getChildNodes()[0]);
    }

    render() {
        const { onUpdate } = this.props;

        if (this.treeRef.current) {
            this.tree = this.treeRef.current.tree;
        }

        return (
            <InfiniteTree
                ref={this.treeRef}
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
                shouldLoadNodes={(node) => {
                    return !node.hasChildren() && node.loadOnDemand;
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
                    const { tree } = this.treeRef.current;

                    if (!node || (node === tree.getSelectedNode())) {
                        return false; // Prevent from deselecting the current node
                    }
                    return true;
                }}
                onKeyUp={(event) => {
                    console.log('onKeyUp', event.target);
                }}
                onKeyDown={(event) => {
                    const { tree } = this.treeRef.current;

                    console.log('onKeyDown', event.target);

                    event.preventDefault();

                    const node = tree.getSelectedNode();
                    const nodeIndex = tree.getSelectedIndex();

                    if (event.keyCode === 37) { // Left
                        tree.closeNode(node);
                    } else if (event.keyCode === 38) { // Up
                        const prevNode = tree.nodes[nodeIndex - 1] || node;
                        tree.selectNode(prevNode);
                    } else if (event.keyCode === 39) { // Right
                        tree.openNode(node);
                    } else if (event.keyCode === 40) { // Down
                        const nextNode = tree.nodes[nodeIndex + 1] || node;
                        tree.selectNode(nextNode);
                    }
                }}
                onScroll={(scrollOffset, event) => {
                    const child = event.target.firstChild;
                    const treeViewportHeight = 400;
                    console.log((scrollOffset / (child.scrollHeight - treeViewportHeight) * 100).toFixed(2));
                    console.log('onScroll', scrollOffset, event);
                }}
                onContentWillUpdate={() => {
                    console.log('onContentWillUpdate');
                }}
                onContentDidUpdate={() => {
                    const { tree } = this.treeRef.current;

                    console.log('onContentDidUpdate');
                    onUpdate(tree.getSelectedNode());
                }}
                onOpenNode={(node) => {
                    console.log('onOpenNode:', node);
                }}
                onCloseNode={(node) => {
                    console.log('onCloseNode:', node);
                }}
                onSelectNode={(node) => {
                    console.log('onSelectNode:', node);
                    onUpdate(node);
                }}
                onWillOpenNode={(node) => {
                    console.log('onWillOpenNode:', node);
                }}
                onWillCloseNode={(node) => {
                    console.log('onWillCloseNode:', node);
                }}
                onWillSelectNode={(node) => {
                    console.log('onWillSelectNode:', node);
                }}
            >
                {({ node, tree }) => {
                    const hasChildren = node.hasChildren();

                    let toggleState = '';
                    if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                        toggleState = 'closed';
                    }
                    if (hasChildren && node.state.open) {
                        toggleState = 'opened';
                    }

                    return renderTreeNode({ node, tree, toggleState, onUpdate });
                }}
            </InfiniteTree>
        );
    }
}

export default Tree;
