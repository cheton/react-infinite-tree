import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { addEventListener } from './helper';

// Draggable Element
const draggableElement = document.querySelector('[data-id="draggable-element"]');

// http://stackoverflow.com/questions/5500615/internet-explorer-9-drag-and-drop-dnd
addEventListener(draggableElement, 'selectstart', (e) => {
    preventDefault(e);
    stopPropagation(e);
    draggableElement.dragDrop();
    return false;
});

addEventListener(draggableElement, 'dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    const target = e.target || e.srcElement;
    e.dataTransfer.setData('text', target.id);
    document.querySelector('[data-id="dropped-result"]').innerHTML = '';
});

addEventListener(draggableElement, 'dragend', function(e) {
});

ReactDOM.render(
    <App />,
    document.querySelector('[data-id="tree"]')
);
