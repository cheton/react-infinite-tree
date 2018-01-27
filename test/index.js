import React from 'react';
import { mount } from 'enzyme';
import { test } from 'tap';
import '../setupTests';
import InfiniteTree from '../src';
import Tree from '../examples/Tree';

test('<InfiniteTree />', (t) => {
    const onUpdate = (node) => {
        t.equal(node.id, '<root>.0');
    };

    const wrapper = mount((
        <Tree onUpdate={onUpdate} />
    ));

    t.equal(wrapper.find(InfiniteTree).length, 1, 'should render <InfiniteTree /> component');
    t.end();
});
