const body = document.querySelector('body');

const myGrid = createGrid(16, 16);

populateGrid(myGrid);

myGrid.classList.add('grid-container');

body.appendChild(myGrid);

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

    return gridContainer;
}

function populateGrid(grid, gridElementClasses = 'grid-element') {
    //getPropertyValue(...).length results in one less than the actual length of row/column
    const gridColumnsCount = grid.style.getPropertyValue('grid-template-columns').length + 1;
    const gridRowsCount = grid.style.getPropertyValue('grid-template-rows').length + 1;
    const gridArea = gridRowsCount * gridColumnsCount;
    const classArr = gridElementClasses.split(' ');

    for (let i = 0; i < gridArea; i++) {
        const gridElement = document.createElement('div');

        if (classArr[0] !== 'grid-element') {
            classArr.map((className) => {
                gridElement.classList.add(className);
            });
        } else {
            gridElement.classList.add(gridElementClasses);
        }

        grid.appendChild(gridElement);
    }
}