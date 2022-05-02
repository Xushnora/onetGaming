
const elList = document.querySelector('.list');
const elTimeBox = document.querySelector('.timeBox');
const elErrorBox = document.querySelector('.error');

let generatedArr = randomArr(pokemons);
let clickCount = 0;
let selectElement = null;
let gameTime = 120;
let columns = {
  x1: [0, 10, 20, 30, 40, 50],
  x2: [1, 11, 21, 31, 41, 51],
  x3: [2, 12, 22, 32, 42, 52],
  x4: [3, 13, 23, 33, 43, 53],
  x5: [4, 14, 24, 34, 44, 54],
  x6: [5, 15, 25, 35, 45, 55],
  x7: [6, 16, 26, 36, 46, 56],
  x8: [7, 17, 27, 37, 47, 57],
  x9: [8, 18, 28, 38, 48, 58],
  x10: [9, 19, 29, 39, 49, 59],
};
let rows = {
  y1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  y2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  y3: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  y4: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  y5: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  y6: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
};

function timer() {
  setInterval(() => {
    if (gameTime <= 0) {
      return;
    }

    let minute = parseInt(gameTime / 60);
    let secund = gameTime % 60;

    gameTime -= 1;

    elTimeBox.textContent = `${String(minute).padStart(2, '0')}:${String(
      secund
    ).padStart(2, '0')}`;
  }, 1000);
}

timer();

// Open Alert
function openAlert(element) {
  var toast = new bootstrap.Toast(element);

  toast.show();
}

// Create random array
function randomArr(arr) {
  let newRandomArray = Array(4).fill(arr).flat(1);

  for (let i = 0; i < 150; i++) {
    var index = parseInt(Math.random() * 60);
    var rendomItem = newRandomArray.splice(index, 1)[0];

    if (rendomItem) {
      newRandomArray = [...newRandomArray, rendomItem];
    }
  }

  return newRandomArray;
}

// Found column name
function foundColumn(index) {
  for (const iterator in columns) {
    for (let i = 0; i < columns[iterator].length; i++) {
      if (columns[iterator][i] === index) {
        return iterator;
      }
    }
  }
}

// Found row name
function foundRow(index) {
  for (const iterator in rows) {
    for (let i = 0; i < rows[iterator].length; i++) {
      if (rows[iterator][i] === index) {
        return iterator;
      }
    }
  }
}

// Render elements to HTML
function renderElements(arr) {
  elList.innerHTML = null;

  for (let i = 0; i < arr.length; i++) {
    let elItem = document.createElement('li');
    elItem.classList = `cardItem`;

    if (arr[i]?.children) {
      let elImg = document.createElement('img');
      elImg.classList = `poke-img`;
      elImg.src = arr[i].children.img;
      elImg.dataset.id = arr[i].id;
      elImg.dataset.index = i;

      elItem.appendChild(elImg);
    }

    elList.appendChild(elItem);
  }
}

// Delete element in column
function deleteElementColumn(columnName, index) {
  for (let i = 0; i < columns[columnName].length; i++) {
    if (columns[columnName][i] === index) {
      columns[columnName][i] = null;
    }
  }
}

// Delete element in crow
function deleteElementRow(rowName, index) {
  for (let i = 0; i < rows[rowName].length; i++) {
    if (rows[rowName][i] === index) {
      rows[rowName][i] = null;
    }
  }
}

// Delete elements
function deleteElements(fistIndex, secondIndex) {
  generatedArr[fistIndex] = null;
  generatedArr[secondIndex] = null;

  deleteElementColumn(foundColumn(fistIndex), fistIndex);
  deleteElementColumn(foundColumn(secondIndex), secondIndex);
  deleteElementRow(foundRow(fistIndex), fistIndex);
  deleteElementRow(foundRow(secondIndex), secondIndex);
  openAlert(elSuccessAlert);
  renderElements(generatedArr);
}

// Check elements
function checkForDelete(firstIndex, secondIndex) {
  let high = firstIndex > secondIndex ? firstIndex : secondIndex;
  let low = firstIndex > secondIndex ? secondIndex : firstIndex;

  if (high - low == 1 || high - low == 10) {
    deleteElements(firstIndex, secondIndex);
  } else if (rows.y1.includes(firstIndex) && rows.y1.includes(secondIndex)) {
    deleteElements(firstIndex, secondIndex);
  } else if (rows.y6.includes(firstIndex) && rows.y6.includes(secondIndex)) {
    deleteElements(firstIndex, secondIndex);
  } else if (
    columns.x1.includes(firstIndex) &&
    columns.x1.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
  } else if (
    columns.x10.includes(firstIndex) &&
    columns.x10.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
  } else {
    openAlert(elErrorAlert);
    renderElements(generatedArr);
  }
}

// Handle click event
function handleClick(evt) {
  if (evt.target.matches('.poke-img')) {
    evt.target.closest('.cardItem').classList.add('cardItem-active');
    let index = evt.target.dataset.index;
    let id = evt.target.dataset.id;

    if (clickCount === 0) {
      clickCount += 1;

      selectElement = {
        id: id,
        index: index,
      };
    } else {
      clickCount = 0;

      if (selectElement.id === id && selectElement.index !== index) {
        checkForDelete(index - 0, selectElement.index - 0);
      } else {
        openAlert(elErrorAlert);
        renderElements(generatedArr);
      }
    }
  }
}

elList.addEventListener('click', handleClick);

renderElements(generatedArr);
