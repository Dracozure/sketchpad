function createGrid(rowCount, columnCount, elementID = null, elementClasses = 'null') {
    const gridContainer = document.createElement('div');
    const classArr = elementClasses.split(' ');

    gridContainer.style.display = 'grid';
    gridContainer.style.setProperty('grid-template-columns'
    , `repeat(${columnCount}, 1fr)`);
    gridContainer.style.setProperty('grid-template-rows'
    , `repeat(${rowCount}, 1fr)`);

    if (elementID !== null) {
        gridContainer.setAttribute('id', addID);
    }

    if (classArr[0] !== 'null') {
        classArr.map((className) => {
            gridContainer.classList.add(className);
        });
    }

    return gridContainer;
}

function populateGrid(grid, elementClasses = 'grid-element') {
    const gridRowCount = window.getComputedStyle(grid).getPropertyValue('grid-template-rows').split(' ').length;
    const gridColumnCount = window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ').length;
    const gridArea = gridRowCount ** gridColumnCount;
    const classArr = elementClasses.split(' ');

    for (let i = 0; i < gridArea; i++) {
        const gridElement = document.createElement('div');

        if (classArr[0] !== 'grid-element') {
            classArr.map((className) => {
                gridElement.classList.add(className);
            });
        }

        grid.appendChild(gridElement);
    }
}