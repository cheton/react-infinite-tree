/* eslint react/jsx-indent: 0 */
import React from 'react';
import classNames from 'classnames';

const defaultRowRenderer = (node, treeOptions) => {
    const { id, name, loadOnDemand = false, children, state } = node;
    const droppable = treeOptions.droppable;
    const { depth, open, path, total, selected = false } = state;
    const childrenLength = Object.keys(children).length;
    const more = node.hasChildren();

    return (
        <div
            className={classNames(
                'infinite-tree-item',
                { 'infinite-tree-selected': selected }
            )}
            data-id={id}
            data-expanded={more && open}
            data-depth={depth}
            data-path={path}
            data-selected={selected}
            data-children={childrenLength}
            data-total={total}
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
};

export {
    defaultRowRenderer
};
