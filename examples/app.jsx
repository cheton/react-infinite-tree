import React from 'react';
import InfiniteTree from '../src';
import rowRenderer from './renderer';
import { quoteattr } from './helper';
import '../src/index.styl';
import './app.styl';
import './animation.styl';

const generateData = () => {
    const data = [];
    const source = '{"id":"<root>","name":"<root>","props":{"droppable":true},"children":[{"id":"alpha","name":"Alpha","props":{"droppable":true}},{"id":"bravo","name":"Bravo","props":{"droppable":true},"children":[{"id":"charlie","name":"Charlie","props":{"droppable":true},"children":[{"id":"delta","name":"Delta","props":{"droppable":true},"children":[{"id":"echo","name":"Echo","props":{"droppable":true}},{"id":"foxtrot","name":"Foxtrot","props":{"droppable":true}}]},{"id":"golf","name":"Golf","props":{"droppable":true}}]},{"id":"hotel","name":"Hotel","props":{"droppable":true},"children":[{"id":"india","name":"India","props":{"droppable":true},"children":[{"id":"juliet","name":"Juliet","props":{"droppable":true}}]}]},{"id":"kilo","name":"(Load On Demand) Kilo","loadOnDemand":true,"props":{"droppable":true}}]}]}';
    for (let i = 0; i < 1000; ++i) {
        data.push(JSON.parse(source.replace(/"(id|name)":"([^"]*)"/g, '"$1": "$2.' + i + '"')));
    }
    return data;
};

class App extends React.Component {
    tree = null;

    updatePreview(node) {
        const el = document.querySelector('[data-id="preview"]');
        if (node) {
            let o = {
                id: node.id,
                name: node.name,
                children: node.children ? node.children.length : 0,
                parent: node.parent ? node.parent.id : null,
                state: node.state
            };
            if (node.loadOnDemand !== undefined) {
                o.loadOnDemand = node.loadOnDemand;
            }
            el.innerHTML = JSON.stringify(o, null, 2).replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
        } else {
            el.innerHTML = '';
        }
    }
    componentDidMount() {
        const data = generateData();
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
                    droppable={{
                        hoverClass: 'infinite-tree-drop-hover',
                        accept: function(opts) {
                            const { type, draggableTarget, droppableTarget, node } = opts;
                            return true;
                        },
                        drop: function(e, opts) {
                            const { draggableTarget, droppableTarget, node } = opts;
                            const source = e.dataTransfer.getData('text');
                            document.querySelector('[data-id="dropped-result"]').innerHTML = 'Dropped to <b>' + quoteattr(node.name) + '</b>';
                        }
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
                    rowRenderer={rowRenderer}
                    selectable={true} // Defaults to true
                    shouldSelectNode={(node) => { // Defaults to null
                        if (!node || (node === this.tree.getSelectedNode())) {
                            return false; // Prevent from deselecting the current node
                        }
                        return true;
                    }}
                    onClick={(event) => {
                        const target = event.target || event.srcElement; // IE8
                        console.log('onClick', target);
                    }}
                    onDoubleClick={(event) => {
                        const target = event.target || event.srcElement; // IE8
                        console.log('onDoubleClick', target);
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
                    onDropNode={(node, e) => {
                        const source = e.dataTransfer.getData('text');
                        document.querySelector('[data-id="dropped-result"]').innerHTML = 'Dropped to <b>' + quoteattr(node.name) + '</b>';
                    }}
                    onContentWillUpdate={() => {
                        console.log('onContentWillUpdate');
                    }}
                    onContentDidUpdate={() => {
                        this.updatePreview(this.tree.getSelectedNode());
                    }}
                    onSelectNode={(node) => {
                        this.updatePreview(node);
                    }}
                />
            </div>
        );
    }
}

export default App;
