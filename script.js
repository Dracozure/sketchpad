function createGrid(boxQuantity, addID = null, addClasses = "") {
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

    if (classArr.length !== 0) {
        classArr.map((className) => {
            gridContainer.classList.add(className);
        });
    }
}

const body = document.querySelector('body');

const myGRid = createGrid(2, "grid-container", "grid container grid-container");

myGRid.textContent = "hello";

body.appendChild(myGRid);