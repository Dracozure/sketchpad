window.onload = () => {
    createGrid(16);
    arrCellsAddEventListeners();
    editorModesAddEventListeners();
}

let mouseDownStatus = 0;
window.onmouseup = () => {
    mouseDownStatus = 0;
}
window.onmousedown = () => {
    mouseDownStatus = 1;
}

let editorMode = 'pen';

function toggleColor(element) {
    const currentColor = document.querySelector('input').value;

    switch (editorMode) {
        case 'pen':
            element.style.backgroundColor = currentColor;
            break;
        case 'rainbow':
            break;
        case 'eraser':
            break;
        case 'shader':
            break;
        case 'clear':
            break;
    }
}

function toggleColorDrag(element) {
    if (mouseDownStatus) {
        toggleColor(element);
    }
}

function editorModesAddEventListeners() {
    const buttons = Array.from(document.querySelectorAll('button:not(.clear)'));
    const clearMode = document.querySelector('button.clear');

    buttons.forEach((element) => {
        element.addEventListener('click', event => {
            editorMode = event.currentTarget.getAttribute('class');
        });
    })

    clearMode.addEventListener('click', clearBoard);
}

function arrCellsAddEventListeners() {
    const gridCells = Array.from(document.querySelector('.grid.box').children);

    gridCells.forEach((element) => {
        element.addEventListener('dragstart', event => {
            event.preventDefault();
        })
        element.addEventListener('mousedown', event => {
            toggleColor(event.currentTarget);
        });
        element.addEventListener('mouseover', event => {
            toggleColorDrag(event.currentTarget);
        });
    });
}

function createGrid(size) {
    const gridArea = size ** 2;
    const gridContainer = document.querySelector('.grid.container');
    const grid = document.createElement('div');
    
    grid.classList.add('grid', 'box');
    grid.style.display = 'grid';

    for (let i = 0; i < gridArea; i++) {
        gridCell = document.createElement('div');
        gridCell.classList.add('cell');

        grid.appendChild(gridCell);
    }

    grid.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);
    grid.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`);

    gridContainer.appendChild(grid);
}

function replaceGrid(size) {
    const grid = document.querySelector('.grid.box');

    grid.remove();

    createGrid(size);
}