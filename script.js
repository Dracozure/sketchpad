function createGrid(boxQuantity, addID = null, addClasses = "null") {
    const gridContainer = document.createElement('div');
    const classArr = addClasses.split(" ");

    gridContainer.style.display = 'grid';
    gridContainer.style.setProperty('grid-template-columns'
    , `repeat(${boxQuantity}, 1fr)`);
    gridContainer.style.setProperty('grid-template-rows'
    , `repeat(${boxQuantity}, 1fr)`);

    if (addID !== null) {
        gridContainer.setAttribute('id', addID);
    }

    if (classArr[0] !== 'null') {
        classArr.map((className) => {
            gridContainer.classList.add(className);
        });
    }

    return gridContainer;
}

function populateGrid(grid) {
    const gridRowCount = window.getComputedStyle(grid).getPropertyValue("grid-template-rows").split(" ").length;
    const gridRowMultiplyColumn = gridRowCount ** 2;

    for (let i = 0; i < gridRowMultiplyColumn; i++) {
        const gridElement = document.createElement('div');

        grid.appendChild(gridElement);
    }
}

const body = document.querySelector('body');

const myGrid = createGrid(2, 'grid');

body.appendChild(myGrid);

populateGrid(myGrid);