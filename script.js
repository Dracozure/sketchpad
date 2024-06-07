window.onload = createGrid(16);

let editorMode = 'pen';

let mouseDownStatus = 0;

window.onmouseup = () => {
    mouseDownStatus = 0;
}

window.onmousedown = () => {
    mouseDownStatus = 1;
}

const gridCells = Array.from(document.querySelector('.grid.box').children);

arrCellsAddEventListeners(gridCells);

function toggleColor() {
    this.style.backgroundColor = 'red';
}

function toggleColorDrag() {
    if (mouseDownStatus) {
        this.style.backgroundColor = 'red';
    }
}

function arrCellsAddEventListeners(array) {
    array.forEach((element) => {
        element.addEventListener('dragstart', event => {
            event.preventDefault();
        })
        element.addEventListener('mousedown', toggleColor);
        element.addEventListener('mouseover', toggleColorDrag);
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