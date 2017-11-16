import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.pre`
    font-family: Consolas;
    font-size: 14px;
    font-weight: bold;
    white-space: pre-wrap;
    background-color: #282c34;
    border: solid 1px #ccc;
    color: #9197a3;
    padding: 20px;
    min-height: 400px;
`;

const Preview = (props) => {
    const { node } = props;

    if (!node) {
        return null;
    }

    const o = {
        id: node.id,
        name: node.name,
        children: node.children ? node.children.length : 0,
        parent: node.parent ? node.parent.id : null,
        state: node.state
    };

    if (node.loadOnDemand !== undefined) {
        o.loadOnDemand = node.loadOnDemand;
    }

    const innerHTML = JSON.stringify(o, null, 2).replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');

    return (
        <PreviewContainer
            dangerouslySetInnerHTML={{__html: innerHTML}}
        />
    );
};

export default Preview;
