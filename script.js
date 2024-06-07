const createGrid = (size) => {
    const gridArea = size ** 2;
    const gridContainer = document.querySelector('.container');
    const grid = document.createElement('div')
    
    grid.classList.add('grid')
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