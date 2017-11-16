import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InfiniteTree from 'infinite-tree';
import VirtualList from 'react-tiny-virtual-list';

const lcfirst = (str) => {
    str += '';
    return str.charAt(0).toLowerCase() + str.substr(1);
};

export default class extends Component {
    static propTypes = {
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        height: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        rowHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.func
        ]).isRequired,
        rowRenderer: PropTypes.func.isRequired
    };
    static defaultProps = {
        tabIndex: 0
    };

    tree = null;
    state = {
        nodes: []
    };

    eventHandlers = {
        /*
        onClick: null,
        onDoubleClick: null,
        onKeyDown: null,
        onKeyUp: null,
        */
        onClusterWillChange: null,
        onClusterDidChange: null,
        onContentWillUpdate: null,
        onContentDidUpdate: null,
        onOpenNode: null,
        onCloseNode: null,
        onSelectNode: null,
        onWillOpenNode: null,
        onWillCloseNode: null,
        onWillSelectNode: null
    };

    componentDidMount() {
        const { children, className, style, ...options } = this.props;

        if (options.el !== undefined) {
            delete options.el;
        }

        options.rowRenderer = () => '';

        this.tree = new InfiniteTree(options);

        this.tree.update = () => {
            this.tree.emit('contentWillUpdate');
            this.setState(state => ({
                nodes: this.tree.nodes
            }), () => {
                this.tree.emit('contentDidUpdate');
            });
        };

        Object.keys(this.eventHandlers).forEach(key => {
            if (!this.props[key]) {
                return;
            }

            const eventName = lcfirst(key.substr(2)); // e.g. onContentWillUpdate -> contentWillUpdate
            this.eventHandlers[key] = this.props[key];
            this.tree.on(eventName, this.eventHandlers[key]);
        });
    }
    componentWillUnmount() {
        Object.keys(this.eventHandlers).forEach(key => {
            if (!this.eventHandlers[key]) {
                return;
            }

            const eventName = lcfirst(key.substr(2)); // e.g. onUpdate -> update
            this.tree.removeListener(eventName, this.eventHandlers[key]);
            this.eventHandlers[key] = null;
        });

        this.tree.destroy();
        this.tree = null;
    }
    render() {
        const {
            width,
            height,
            rowHeight,
            onKeyUp,
            onKeyDown,
            tabIndex,
            className,
            style
        } = this.props;
        const render = (typeof this.props.children === 'function')
            ? this.props.children
            : this.props.rowRenderer;
        const count = this.tree
            ? this.tree.nodes.length
            : 0;

        return (
            <div
                className={className}
                style={{
                    outline: 'none',
                    ...style
                }}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                tabIndex={tabIndex}
            >
                <VirtualList
                    ref={node => {
                        this.virtualList = node;
                    }}
                    width={width}
                    height={height}
                    itemCount={count}
                    itemSize={rowHeight}
                    renderItem={({ index, style }) => {
                        let row = null;
                        if (typeof render === 'function' && this.tree && this.tree.nodes.length > 0) {
                            row = render({
                                tree: this.tree,
                                node: this.tree.nodes[index]
                            });
                        }

                        return (
                            <div key={index} style={style}>
                                {row}
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
};
