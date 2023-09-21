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

function populateGrid(grid, rowCount, columnCount, gridElementClasses = 'grid-element') {
    const gridArea = rowCount * columnCount;
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