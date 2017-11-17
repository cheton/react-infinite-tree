import React from 'react';

const Icon = ({ state, ...props }) => (
    <span {...props}>
    {{
        'opened': (<i className="fa fa-fw fa-folder-open-o" />),
        'closed': (<i className="fa fa-fw fa-folder-o" />),
    }[state] || (<i className="fa fa-fw fa-file-o" />)}
    </span>
);

export default Icon;
