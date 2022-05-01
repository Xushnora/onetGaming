const elList = document.querySelector('.list');
let elErrorBox = document.querySelector('.error');
let resCount = document.querySelector('.resCount');
let generatedArr = randomArr(pokemons);
let clickCount = 0;
let selectElement = null;
let counter = 0;
const myColumns = {
  y1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  y6: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
  x1: [0, 10, 20, 30, 40, 50],
  x10: [9, 19, 29, 39, 49, 59],
};

// Create random array
function randomArr(arr) {
  let newRandomArray = Array(4).fill(arr).flat(1);

  for (let i = 0; i < 150; i++) {
    let index = parseInt(Math.random() * 60);
    let rendomItem = newRandomArray.splice(index, 1)[0];

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

// For counter ---
// function counterBox(counter = 1) {
//   counter++;
//   resCount.textContent = `+ ${counter}`
// }

// Delete elements
function deleteElements(fistIndex, secondIndex) {
  generatedArr[fistIndex] = null;
  generatedArr[secondIndex] = null;

  renderElements(generatedArr);
}

// Check delete
function checkForDelete(firstIndex, secondIndex) {
  let high = firstIndex > secondIndex ? firstIndex : secondIndex;
  let width = firstIndex > secondIndex ? secondIndex : firstIndex;

  if (high - width == 1 || high - width == 10) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if (
    myColumns.y1.includes(firstIndex) &&
    myColumns.y1.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if (
    myColumns.y6.includes(firstIndex) &&
    myColumns.y6.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if (
    myColumns.x1.includes(firstIndex) &&
    myColumns.x1.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox()
  } else if (
    myColumns.x10.includes(firstIndex) &&
    myColumns.x10.includes(secondIndex)
  ) {
    deleteElements(firstIndex, secondIndex);
    alertSuccessBox();
  } else {
    alertErrorBox()
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
        setTimeout(function(){
          checkForDelete(index - 0, selectElement.index - 0);
        }, 300);
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