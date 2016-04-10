import React from 'react';
import InfiniteTree from '../src';
import rowRenderer from './renderer';
import { quoteattr } from './helper';
import '../src/index.styl';
import './animation.styl';

const generateData = () => {
    const data = [];
    const source = '{"id":"<root>","label":"<root>","props":{"droppable":true},"children":[{"id":"alpha","label":"Alpha","props":{"droppable":true}},{"id":"bravo","label":"Bravo","props":{"droppable":true},"children":[{"id":"charlie","label":"Charlie","props":{"droppable":true},"children":[{"id":"delta","label":"Delta","props":{"droppable":true},"children":[{"id":"echo","label":"Echo","props":{"droppable":true}},{"id":"foxtrot","label":"Foxtrot","props":{"droppable":true}}]},{"id":"golf","label":"Golf","props":{"droppable":true}}]},{"id":"hotel","label":"Hotel","props":{"droppable":true},"children":[{"id":"india","label":"India","props":{"droppable":true},"children":[{"id":"juliet","label":"Juliet","props":{"droppable":true}}]}]},{"id":"kilo","label":"(Load On Demand) Kilo","loadOnDemand":true,"props":{"droppable":true}}]}]}';
    for (let i = 0; i < 1000; ++i) {
        data.push(JSON.parse(source.replace(/"(id|label)":"([^"]*)"/g, '"$1": "$2.' + i + '"')));
    }
    return data;
};

class App extends React.Component {
    tree = null;

    updatePreview(node) {
        const el = document.querySelector('#preview');
        if (node) {
            let o = {
                id: node.id,
                label: node.label,
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
                    droppable={true}
                    loadNodes={(parentNode, done) => {
                        const suffix = parentNode.id.replace(/(\w)+/, '');
                        const nodes = [
                            {
                                id: 'node1' + suffix,
                                label: 'Node 1'
                            },
                            {
                                id: 'node2' + suffix,
                                label: 'Node 2'
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
                    onDropNode={(node, e) => {
                        const source = e.dataTransfer.getData('text');
                        document.querySelector('#dropped-result').innerHTML = 'Dropped to <b>' + quoteattr(node.label) + '</b>';
                    }}
                    onUpdate={() => {
                        this.updatePreview(this.tree.getSelectedNode());
                    }}
                    onScrollProgress={(progress) => {
                        document.querySelector('#scrolling-progress').style.width = progress + '%';
                    }}
                    onSelect={(node) => {
                        this.updatePreview(node);
                    }}
                />
            </div>
        );
    }
}

export default App;
