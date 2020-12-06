const gameContainer = document.getElementById("game");
let MaxCards = 0;
let colorMatch;
let dataId;
let turns = 0;
const turnContainer = document.querySelector('#turns span');
const newGameButton = document.querySelector('#newGame');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let counter = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.setAttribute('data-id', counter);
    counter++;
    newDiv.innerHTML = '<i class="fas fa-atom" aria-hidden="true"></i>'
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // newDiv.child.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  turns++;
  turnContainer.innerText = turns;
  let color = event.target.closest('div').getAttribute('class')
  if (MaxCards == 0) {
    colorMatch = color;
    dataId = event.target.closest('div').getAttribute('data-id');
    event.target.closest('div').style.backgroundColor = color;
    MaxCards++;
  } else if (colorMatch === color && dataId != event.target.closest('div').getAttribute('data-id')) {
    event.target.closest('div').style.backgroundColor = color;
    colorMatch = '';
    MaxCards = 0;
  } else if (MaxCards < 2) {
    event.target.closest('div').style.backgroundColor = color;
    MaxCards++;
  }

  if (MaxCards == 2) {
    window.setTimeout(clearNonMatches, 1000, color);
  }

  // console.log("you just clicked", event.target);
}

function clearNonMatches(color) {
  let alldivs = document.querySelectorAll('div');
  for (let div of alldivs) {
    if (div.getAttribute('class') == color || div.getAttribute('class') == colorMatch) {
      div.style.backgroundColor = '#e9eaf0';
    }
  }
  MaxCards = 0;
}
// when the DOM loads
createDivsForColors(shuffledColors);

newGameButton.addEventListener('click', function () {
  turns = 0;
  MaxCards = 0;
  turnContainer.innerText = turns;
  let alldivs = document.querySelectorAll('#game div');
  for (let div of alldivs) {
    div.remove();
  }
  createDivsForColors(shuffle(COLORS));
});