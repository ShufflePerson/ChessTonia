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

console.log(`We are playing as: ${isWhite() ? "white": "black"}`);


setInterval(() => {
  sendInformation();
}, 5000);