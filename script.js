window.onload = () => {
    createGrid(16);
    displayGridSlider();
    updateSliderDisplay(16, document.querySelector('.slider.display'));
    arrCellsAddEventListeners();
    editorModesAddEventListeners();
    mouseCheckExitGrid();
    toggleCurrentModeDisplay(document.querySelector('.pen'));
}

let mouseDownStatus = 0;
window.onmouseup = () => {
    mouseDownStatus = 0;
}
window.onmousedown = () => {
    mouseDownStatus = 1;
}

let editorMode = 'pen';
let mouseInsideDiv = false;

function toggleCurrentModeDisplay(newElement,currentElement=null) {
    if (currentElement) {
        currentElement.classList.remove('current', 'mode');
    }
    
    newElement.classList.add('current', 'mode');
}

function toggleColor(element) {
    const currentColor = document.querySelector('input').value;

    switch (editorMode) {
        case 'pen':
            element.style.backgroundColor = currentColor;
            break;
        case 'rainbow':
            rainbow(element);
            break;
        case 'eraser':
            eraser(element);
            break;
        case 'shader':
            shader(element);
            break;
        case 'clear':
            clearBoard();
            break;
    }
}

function displayGridSlider() {
    const slider = document.querySelector('input.slider');
    const sliderDisplay = document.querySelector('.slider.display');

    slider.addEventListener('input', () => {
        updateSliderDisplay(slider.value, sliderDisplay);
    });

    slider.addEventListener('change', () => {
        replaceGrid(slider.value);
    });
}

function updateSliderDisplay(gridSize, element) {
    element.textContent = `${gridSize} x ${gridSize}`;
}

function toggleColorDrag(element) {
    if (mouseDownStatus) {
        toggleColor(element);
    }
}

function rainbow(element) {
    let rgbArr = element.style.backgroundColor.slice(4,-1).split(', ');
    rgbArr = rgbArr.map(() => {
        return Math.floor(Math.random() * 256);
    });

    element.style.backgroundColor = `rgb(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]})`;
}

function eraser(element) {
    element.style.backgroundColor = '#ffffff';
}

function shader(element) {
    let rgbArr = element.style.backgroundColor.slice(4,-1).split(', ');
    rgbArr = rgbArr.map(value => value * 0.85);

    element.style.backgroundColor = `rgb(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]})`;
}

function clearBoard() {
    const gridCells = Array.from(document.querySelector('.grid.box').children);

    gridCells.forEach((element) => {
        element.style.backgroundColor = '#ffffff';
    });
}

function editorModesAddEventListeners() {
    const buttons = Array.from(document.querySelectorAll('button:not(.clear)'));
    const clearMode = document.querySelector('button.clear');

    buttons.forEach((element) => {
        element.addEventListener('click', event => {
            const currentMode = document.querySelector('.current.mode');

            editorMode = event.currentTarget.classList[0];
            toggleCurrentModeDisplay(event.target, currentMode);
        });
    })

    clearMode.addEventListener('click', clearBoard);
}

function arrCellsAddEventListeners() {
    const grid = document.querySelector('.grid.box');
    const gridCells = Array.from(grid.children);

    gridCells.forEach((element) => {
        element.addEventListener('dragstart', event => {
            event.preventDefault();
        })
        element.addEventListener('mousedown', event => {
            mouseInsideDiv = true;
            toggleColor(event.currentTarget);
        });
        element.addEventListener('mouseover', event => {
            if (mouseInsideDiv) {
                toggleColorDrag(event.currentTarget);
            }
        });
    });
}

function mouseCheckExitGrid() {
    const grid = document.querySelector('.grid.box');

    grid.addEventListener('mouseleave', () => mouseInsideDiv = false);
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

        gridCell.style.backgroundColor = '#ffffff';

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

    arrCellsAddEventListeners();
    editorModesAddEventListeners();
    mouseCheckExitGrid();
}