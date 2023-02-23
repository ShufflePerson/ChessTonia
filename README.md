# ChessTonia

## Screenshots
![Screenshot](/images/screenshot.png)
`e4e3` means move from e4 to e3

## Keep in mind
The `Animation Type` in chess.com settings must be set to one of these options: `None`, `Slow`, `Medium` or `Fast`. Any other type will not work

## Overview
Able to give the best move by stockfish from a live chess.com game. Basically a Chess Cheat. 

**Please do not cheat against anyone, cheating is a scum thing to do**

## Usage 
1. Run the server with the command listed in the `Install` section.
2. Go to `http://localhost:3000/browser/script.js`
3. Copy everything displayed
4. Go to your chess.com game, open the Developer Console (Right Click -> Inspect Element or F12 or Ctrl Shift + I)
5. Go to the console tab, paste in the script and press enter
6. Profit


## Install

Clone the repo
```
git clone https://github.com/ShufflePerson/ChessTonia.git
cd ChessTonia
```

Install the NPM packages & other required libaries
```
npm install
npm install typescript
npm install ts-node
```

Run it 
```
ts-node src/index.ts
```

## Compiling Stockfish 
For instructions on how to compile stockfish on your machine, head to [StockFish Github](https://github.com/official-stockfish/Stockfish)


## Contact
You can contact me on Discord: Shuffle#4696
