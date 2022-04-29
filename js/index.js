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
  let x = 1;
  let y = 1;

  for (let i = 0; i < arr.length; i++) {
    if (x > 10) {
      x = 1;
      y++;
    }
    let elItem = document.createElement('li');
    elItem.classList = `cardItem x_${x} y_${y}`;
    if (arr[i]?.children) {
      let elImg = document.createElement('img');
      elImg.classList = `poke-img x_${x} y_${y}`;
      elImg.src = arr[i].children.img;
      elImg.dataset.id = arr[i].id;
      elImg.dataset.index = i;
      // console.log(elImg.classList);

      elItem.appendChild(elImg);
      x++;
    }
    elList.appendChild(elItem);
  }
}
renderElements(generatedArr);

let cardItem = document.querySelectorAll('.cardItem');
let pokeImg = document.querySelectorAll('.poke-img');

// console.log(cardItem);

let clickCount = 0;
let selectElement = null;

// console.log(cardItem);

let xxx = [];
let yyy = [];
cardItem.forEach((item) => {
  xxx.push(item.classList[1].split('_')[1]);
  yyy.push(item.classList[2].split('_')[1]);
  // console.log(item.classList[1].split('_')[1]);
  // console.log(item.classList[2].split('_')[1]);
});

console.log(xxx, yyy);

elList.addEventListener('click', (evt) => {
  // let xxx = evt.target.closest('.cardItem').classList[1].split('_')[1];
  // let yyy = evt.target.closest('.cardItem').classList[2].split('_')[1];
  // let arr1 = [];
  // arr1.push(xxx, yyy);
  // console.log(arr1);
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

      if (selectElement.id === id && selectElement.index !== index) {
        let xx = evt.target.classList[1].split('_')[1];
        let yy = evt.target.classList[2].split('_')[1];

        let arr2 = [];
        arr2.push(xx, yy);
        console.log(arr2);
      
        console.log('ok');
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


// Lazizadan oldim...

document.querySelector('.timeBox').innerHTML =
  05 + ":" + 1;
timeStart();


function timeStart() {
  var justTime = document.querySelector('.timeBox').innerHTML;
  var arrTime = justTime.split(/[:]+/);
  var j = arrTime[0];
  var k = checkSecond((arrTime[1] - 1));
  if(k==59){j=j-1}
  if(j<0){
    return
  }
  
  document.querySelector('.timeBox').innerHTML =
    j + ":" + k;
  setTimeout(timeStart, 1000);
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
  if (sec < 0) {sec = "59"};
  return sec;
}