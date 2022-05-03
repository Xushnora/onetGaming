
const elList = document.querySelector('.list');
const elErrorBox = document.querySelector('.error');
let resCount = document.querySelector('.resCount');
// restart timer
let elgameModalBox = document.querySelector('.gameModal');
let elRestartBtn = document.querySelector('.btnRestart');

let generatedArr = randomArr(pokemons);
let clickCount = 0;
let couter = 0;
let selectElement = null;
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

// Render elements
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

// Alert box
function alertSuccessBox() {
  elErrorBox.textContent = "Success"
  elErrorBox.style.color = "green" 
}

function alertErrorBox() {
  elErrorBox.textContent = "Try again"
  elErrorBox.style.color = "red" 
}

// Found column name
function foundColumn(index) {
  for (const int in columns) {
    for (let i = 0; i < columns[int].length; i++) {
      if (columns[int][i] === index) {
        return int;
      }
    }
  }
}

// Found row name
function foundRow(index) {
  for (const int in rows) {
    for(let i = 0; i < rows[int].length; i++) {
      if(rows[int][i] === index) {
        return int
      }
    }
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

// Delete element in row
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
  renderElements(generatedArr);
}

// Delete element in BUG
function checkForDeleteInner(firstIndex, secondIndex) {
  let high = firstIndex > secondIndex ? firstIndex : secondIndex;
  let low = firstIndex > secondIndex ? secondIndex : firstIndex;
  
  if(high - low == 9) {
    if(columns.x1[0] == null || columns.x2[1] == null){
      deleteElements(firstIndex, secondIndex);
      alertSuccessBox()
    }
  } else if(high - low == 9 && columns.x2[0] == null || columns.x3[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x3[0] == null || columns.x4[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x4[0] == null || columns.x5[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x5[0] == null || columns.x6[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x6[0] == null || columns.x7[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x7[0] == null || columns.x8[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x8[0] == null || columns.x9[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x9[0] == null || columns.x10[1] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } 
  // two block
   else if(high - low == 9 && columns.x1[1] == null || columns.x2[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x2[1] == null || columns.x3[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x3[1] == null || columns.x4[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x4[1] == null || columns.x5[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x5[1] == null || columns.x6[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x6[1] == null || columns.x7[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x7[1] == null || columns.x8[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x8[1] == null || columns.x9[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x9[1] == null || columns.x10[2] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }
  // three block
  else if(high - low == 9 && columns.x1[2] == null || columns.x2[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x1[2] == null || columns.x2[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x1[2] == null || columns.x2[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x1[2] == null || columns.x2[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x1[2] == null || columns.x2[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x2[2] == null || columns.x3[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x3[2] == null || columns.x4[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x4[2] == null || columns.x5[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x5[2] == null || columns.x6[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x6[2] == null || columns.x7[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x7[2] == null || columns.x8[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x8[2] == null || columns.x9[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x9[2] == null || columns.x10[3] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } 
  // // four block
  else if(high - low == 9 && columns.x1[3] == null || columns.x2[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x2[3] == null || columns.x3[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x3[3] == null || columns.x4[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x4[3] == null || columns.x5[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x5[3] == null || columns.x6[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x6[3] == null || columns.x7[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x7[3] == null || columns.x8[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x8[3] == null || columns.x9[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x9[3] == null || columns.x10[4] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } 
  // // five block
  else if(high - low == 9 && columns.x1[4] == null || columns.x2[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x2[4] == null || columns.x3[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x3[4] == null || columns.x4[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x4[4] == null || columns.x5[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x5[4] == null || columns.x6[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if(high - low == 9 && columns.x6[4] == null || columns.x7[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x7[4] == null || columns.x8[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x8[4] == null || columns.x9[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  }  else if(high - low == 9 && columns.x9[4] == null || columns.x10[5] == null) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else {
    alertErrorBox()
    renderElements(generatedArr);
  }

}

// check elements 
function checkDeleteOther(bigIndex, smallIndex) {
  let highRow = foundRow(bigIndex);
  let lowRow = foundRow(smallIndex);

  if(
    bigIndex - smallIndex < 10 &&
    highRow.split('')[1] - lowRow.split('')[1] === 1
  ) {
    if(!rows[lowRow][bigIndex - 10]) {
      deleteElements(bigIndex, smallIndex);
      alertSuccessBox()
      resCount.textContent = `${++couter} +`;
    }
  } else {
    alertErrorBox()
    renderElements(generatedArr);
  }
}

// Check elements
function checkForDelete(firstIndex, secondIndex) {
  let high = firstIndex > secondIndex ? firstIndex : secondIndex;
  let low = firstIndex > secondIndex ? secondIndex : firstIndex;

  if (high - low == 1 || high - low == 10) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
    resCount.textContent = `${++couter} +`;
  } else if (
    rows.y1.includes(firstIndex) &&
    rows.y1.includes(secondIndex)) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox();
    resCount.textContent = `${++couter} +`;
  } else if (
    rows.y6.includes(firstIndex) &&
    rows.y6.includes(secondIndex)) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox();
    resCount.textContent = `${++couter} +`;
  } else if (
    columns.x1.includes(firstIndex) &&
    columns.x1.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox();
    resCount.textContent = `${++couter} +`;
  } else if (
    columns.x10.includes(firstIndex) &&
    columns.x10.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
    resCount.textContent = `${++couter} +`;
  } else {
    checkDeleteOther(high, low)
  }
}

// Click event
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
        alertErrorBox()
        renderElements(generatedArr);
      }
    }
  }
}

elList.addEventListener('click', handleClick);

renderElements(generatedArr);

// time time timer

let elTimeBox = document.querySelector('.timeBox');
let gameTime = 120;

// time time timer

function timer() {
  setInterval(() => {
    if (gameTime < 0) {
      elgameModalBox.classList.add('show')
      function restartBtn() {
        elRestartBtn.addEventListener("click", () =>{
          window.location.reload();
          return;
        })
      }
      restartBtn()
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

