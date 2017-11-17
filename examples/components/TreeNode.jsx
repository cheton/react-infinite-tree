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
