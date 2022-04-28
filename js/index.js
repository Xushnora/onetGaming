const elList = document.querySelector('.list');
const elError = document.querySelector('.error');

function randomArr(arr) {
  let newRandomArray = Array(4).fill(arr).flat(1);

  for (let i = 0; i < 150; i++) {
    var indexA = parseInt(Math.random() * 60);

    var rendomItem = newRandomArray.splice(indexA, 1)[0];

    if (rendomItem) {
      newRandomArray = [...newRandomArray, rendomItem];
    }
  }

  return newRandomArray;
}

const generatedArr = randomArr(pokemons);

function renderElements(arr) {
  elList.innerHTML = null;

  for (let i = 0; i < arr.length; i++) {
    let elItem = document.createElement('li');
    elItem.className = "cardItem"
    if (arr[i]?.children) {
      let elImg = document.createElement('img');
      elImg.className = 'poke-img';
      elImg.src = arr[i].children.img;
      elImg.dataset.id = arr[i].id;
      elImg.dataset.index = i;

      elItem.appendChild(elImg);
    }

    elList.appendChild(elItem);
  }
}
renderElements(generatedArr);

let clickCount = 0;
let selectElement = null;

elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.poke-img')) {
    let index = evt.target.dataset.index;
    let id = evt.target.dataset.id;

    if (clickCount === 0) {
      clickCount += 1;

      selectElement = {
        id: id,
        index: index,
      };

      elError.textContent = '';
    } else {
      clickCount = 0;

      if (selectElement.id === id) {
        generatedArr[index] = null;
        generatedArr[selectElement.index] = null;
        elError.textContent = 'Success';
      } else {
        elError.textContent = 'Error';
      }
    }

    renderElements(generatedArr);
  }
});
