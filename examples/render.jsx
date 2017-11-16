import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import React from 'react';
import styled from 'styled-components';

const rowHeight = 30;

const TreeNode = styled.div`
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

const Toggler = styled(({ state, ...props }) => (
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

const Icon = ({ state, ...props }) => (
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

const PointerCursor = styled.div`
    display: inline-block;
    cursor: pointer;
`;

const Text = styled.span`
    margin-left: 0 2px;
    user-select: none;
`;

const Label = styled.span`
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color :#fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
    background-color: #337ab7;
    user-select: none;
`;

const Loading = () => (
    <i className="fa fa-fw fa-spin fa-spinner" />
);

const render = ({ node, tree }) => {
    const treeOptions = tree.options;
    const { id, name, loadOnDemand = false, children, state, props = {} } = node;
    const droppable = (treeOptions.droppable) && (props.droppable);
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
            {loading && <Loading />}
            <Label style={{ position: 'absolute', right: 5, top: 6 }}>
                {childrenLength}
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
                    <i className="fa fa-fw fa-cog" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <MenuItem>{name}</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        </TreeNode>
    );
};

export default render;
