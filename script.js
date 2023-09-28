const body = document.querySelector('body');
const grid = createGrid(16, 16);
const arr = Array.from(grid.children);

addArrEventListeners(arr);
body.appendChild(grid);

function toggleNewMode(newMode) {
    const currentMode = 0;
}

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

function toggleColor() {
    mouseDown++;
    this.style.backgroundColor = getPickedColor();
}

function toggleColorByHover() {
    if (mouseDown) {
        this.style.backgroundColor = getPickedColor();
    }
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





