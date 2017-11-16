import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import InfiniteTree from '../src/InfiniteTree';
import render from './render';
import '../src/index.styl';

const generateData = () => {
    const data = [];
    const source = '{"id":"<root>","name":"<root>","props":{"droppable":true},"children":[{"id":"alpha","name":"Alpha","props":{"droppable":true}},{"id":"bravo","name":"Bravo","props":{"droppable":true},"children":[{"id":"charlie","name":"Charlie","props":{"droppable":true},"children":[{"id":"delta","name":"Delta","props":{"droppable":true},"children":[{"id":"echo","name":"Echo","props":{"droppable":true}},{"id":"foxtrot","name":"Foxtrot","props":{"droppable":true}}]},{"id":"golf","name":"Golf","props":{"droppable":true}}]},{"id":"hotel","name":"Hotel","props":{"droppable":true},"children":[{"id":"india","name":"India","props":{"droppable":true},"children":[{"id":"juliet","name":"Juliet","props":{"droppable":true}}]}]},{"id":"kilo","name":"(Load On Demand) Kilo","loadOnDemand":true,"props":{"droppable":true}}]}]}';
    for (let i = 0; i < 1000; ++i) {
        data.push(JSON.parse(source.replace(/"(id|name)":"([^"]*)"/g, '"$1": "$2.' + i + '"')));
    }
    return data;
};

class Tree extends PureComponent {
    static propTypes = {
        onUpdate: PropTypes.func
    };

    tree = null;
    data = generateData();

    componentDidMount() {
        //this.tree.loadData(data);

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
                onContentWillUpdate={() => {
                    console.log('onContentWillUpdate');
                }}
                onContentDidUpdate={() => {
                    this.props.onUpdate(this.tree.getSelectedNode());
                }}
                onSelectNode={(node) => {
                    this.props.onUpdate(node);
                }}
            >
            {({ node, tree }) => {
                return render({ node, tree });
            }}
            </InfiniteTree>
        );
    }
}

export default Tree;
