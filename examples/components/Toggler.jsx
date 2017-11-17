import React from 'react';
import styled from 'styled-components';

const Toggler = styled(({ state, ...props }) => (
    <a {...props}>
        {(state === 'closed') &&
        <i className="fa fa-fw fa-chevron-right" />
        }
        {(state === 'opened') &&
        <i className="fa fa-fw fa-chevron-down" />
        }
    </a>
))`
    color: #333;
    display: inline-block;
    text-align: center;
    margin-right: 2px;
`;

export default Toggler;
