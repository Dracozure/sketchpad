const body = document.querySelector('body');
const grid = createGrid(16, 16);
const gridElementsArr = Array.from(grid.children);

addArrEventListeners(gridElementsArr);
body.appendChild(grid);

function createGrid(rowCount, columnCount, elementID = null, elementClasses = 'grid') {
    const gridContainer = document.createElement('div');
    const classArr = elementClasses.split(' ');

    gridContainer.style.display = 'grid';
    gridContainer.style
    .setProperty('grid-template-columns', `repeat(${columnCount}, 1fr)`);
    gridContainer.style
    .setProperty('grid-template-rows', `repeat(${rowCount}, 1fr)`);

    if (elementID !== null) {
        gridContainer.setAttribute('id', addID);
    }

    if (classArr[0] !== 'null') {
        classArr.map((className) => {
            gridContainer.classList.add(className);
        });
    } else {
        gridContainer.classList.add(elementClasses);
    }

    populateGrid(gridContainer, rowCount, columnCount);

    return gridContainer;
}

function populateGrid(grid, rowCount, columnCount) {
    const gridArea = rowCount * columnCount;

    for (let i = 0; i < gridArea; i++) {
        const gridElement = document.createElement('div');

        gridElement.setAttribute('id', 'grid-element');
        grid.appendChild(gridElement);
    }
}

/* Tracking mouse activity over grid board */

let mouseDown = 0;

window.onmouseup = () => {
    mouseDown = 0;
}

function addArrEventListeners(array) {
    array.forEach((element) => {
        element.addEventListener('dragstart', event => {
            event.preventDefault();
        });
        element.addEventListener('mousedown', toggleColor);
        element.addEventListener('mouseover', toggleColorByHover);
    });
}

function getPickedColor() {
    return document.getElementById('colorpicker').value;
}

/* Grid size display */
const settingsPanel = document.querySelector('.settings.panel');
const slider = document.querySelector('.slider');
const gridSizeDisplay = document.createElement('h2');

gridSizeDisplay.textContent = `Grid Size: ${slider.value} x ${slider.value}`;

slider.addEventListener('input', () => {
    updateGridSize();
});
slider.addEventListener('change', () => {
    updateGrid();
});

settingsPanel.appendChild(gridSizeDisplay);

function updateGridSize() {
    gridSizeDisplay.textContent = `Grid Size: ${slider.value} x ${slider.value}`; 
}

function updateGrid() {
    const newGrid = createGrid(slider.value, slider.value);
    const currentGrid = document.querySelector('.grid');
    const arr = Array.from(newGrid.children);

    addArrEventListeners(arr);
    currentGrid.replaceWith(newGrid);
}

/* Mode toggle control */
const startingPenMode = document.getElementById('pen-mode');
const allModesArr = Array.from(settingsPanel.querySelectorAll('.mode'));

startingPenMode.classList.toggle('current');
addModeEventListeners(allModesArr);

function getCurrentMode() {
    return document.querySelector('.mode.current');
}

function toggleMode() {
    const currentMode = getCurrentMode();

    if (this.id === 'clear-mode') {
        clearBoard();
        return;
    }

    currentMode.classList.toggle('current');
    this.classList.toggle('current');
}

function addModeEventListeners(modeArr) {
    modeArr.forEach((mode) => {
        mode.addEventListener('click', toggleMode);
    });
}

/* Color toggle control */
function toggleColor() {
    const currentMode = getCurrentMode().id;

    mouseDown++;

    switch(currentMode) {
        case 'pen-mode':
            colorPenMode(this);
            break;
        case 'rainbow-mode':
            colorRainbowMode(this);
            break;
        case 'eraser-mode':
            eraseElement(this);
            break;
    }
}

function toggleColorByHover() {
    const currentMode = getCurrentMode().id;

    if (mouseDown) {
        switch(currentMode) {
            case 'pen-mode':
                colorPenMode(this);
                break;
            case 'rainbow-mode':
                colorRainbowMode(this);
                break;
            case 'eraser-mode':
                eraseElement(this);
                break;
        }
    }
}

function eraseElement(element) {
    element.style.backgroundColor = 'rgb(255, 255, 255)';
}

function colorPenMode(element) {
    element.style.backgroundColor = getPickedColor();
}

function colorRainbowMode(element) {
    const randomColor = getRandomColor();

    element.style.backgroundColor = randomColor;
}

function getRandomColor() {
    const generateRgbValue = () => {
        return Math.floor(Math.random() * 255);
    }

    return `rgb(${generateRgbValue()}, ${generateRgbValue()}, ${generateRgbValue()})`
}

function clearBoard() {
    const grid = document.querySelector('.grid');
    const gridElementsArr = Array.from(grid.children);

    gridElementsArr.forEach((gridElement) => {
        gridElement.style.backgroundColor = 'rgb(255, 255, 255)';
    });
}





