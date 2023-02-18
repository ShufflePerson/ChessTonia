//ChessTonia Browser sided-script. 

//Could use an array with +1 padding, but this feels nicer
let locationMap = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H"
};

let colorMap = {
  "b": "black",
  "w": "white"
};

let pieceNameMap = {
  "r": "rook",
  "p": "pawn",
  "n": "night",
  "b": "bishop",
  "q": "queen",
  "k": "king"
};


function getPieces(className = "piece") { 
  let pieces = document.querySelectorAll(`.${className}`);

  let parsedPieces = [];

  pieces.forEach((piece) => {
    let classes = piece.classList;
    let rawLocation = classes[2].split('-').pop(); 
    let team = classes[1][0];
    let name = pieceNameMap[classes[1][1]];

    if(team == "b")
      name = name.toUpperCase();

    if(!locationMap[rawLocation[0]])
      rawLocation = classes[1].split("-").pop();

    parsedPieces.push({
      name,
      rawLocation,
      loc: [
        locationMap[rawLocation[0]],
        rawLocation[1]
      ]
    })
  })

  return parsedPieces;
}


function isWhite() {
  let elm = document.getElementsByClassName("flipped");
  if(elm.length > 0)
    return false;
  return true;
}

function sendInformation() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/chess/update");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  let data = JSON.stringify({
    isWhite: isWhite(),
    pieces: getPieces()
  });

  console.log(data);


  xhr.send(data);
}

function sendFEN() {

}

console.log(`We are playing as: ${isWhite() ? "white": "black"}`);


let sleep = ms => {  
  return new Promise(resolve => setTimeout(resolve, ms));  
};
//sendInformation();

async function getFEN(cb) {
  document.querySelector("[data-cy='Download']").click();
  let button = document.getElementsByClassName("ui_outside-close-component")[0];
  let run = false;
  while(!run) {
    button = document.getElementsByClassName("ui_outside-close-component")[0];
    if(button && typeof(button.click) == "function")
      run = true;

    await sleep(10);
  }
  document.getElementsByClassName("ui_modal-component")[0].style.display = "none"; 
  document.getElementsByClassName("ui_modal-bg ui_modal-bg-dark")[0].style.display = "none";
  button.click();
  cb(document.getElementsByClassName("ui_v5-input-component")[1].value);
}

function initFEN() {
    let custom_css = `
      .ui_modal-bg {
          display: none !important;
      }

      .ui_modal-component {
          display: none !important;
      }

  `;


  var style = document.createElement('style');

  style.innerHTML = custom_css;

  document.head.appendChild(style);
}

function sendFEN(fen) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/chess/fen");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  let data = JSON.stringify({
    fen
  });

  console.log(data);


  xhr.send(data);
}

/*
initFEN();

let last_fen = "";
setInterval(() => {
  getFEN((fen) => {
    if(fen != last_fen) {
      sendFEN(fen);
      last_fen = fen;
    }
  })
}, 100);
*/



setInterval(() => {
  sendInformation();
}, 5000);