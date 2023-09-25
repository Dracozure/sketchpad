let mouseDown = 0;

window.onmouseup = () => {
    mouseDown = 0;
}

window.onmousedown = () => {
    ++mouseDown;
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

function getPickedColor() {
    return document.getElementById('colorpicker').value;
}

function toggleColor() {
    this.style.backgroundColor = getPickedColor();
}

function toggleColorByHover() {
    if (mouseDown) {
        this.style.backgroundColor = getPickedColor();
    }
}

const body = document.querySelector('body');

const grid = createGrid(5,4);

const arr = Array.from(grid.children);

arr.forEach((element) => {
    element.addEventListener('dragstart', event => {
        event.preventDefault();
    });
    element.addEventListener('mousedown', toggleColor);
    element.addEventListener('mouseover', toggleColorByHover);
});

body.appendChild(grid);

