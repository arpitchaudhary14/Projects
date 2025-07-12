let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let turn_of_playerO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Shows winner message and disables further moves
const showWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}`;
  messageContainer.classList.remove("hide");
  gameOver = true; // sets gameOver true to block further clicks
  disableBoxes(); // disables all boxes after win
};

// Shows draw message and disables further moves
const showDraw = () => {
  message.innerText = "Game Draw!";
  messageContainer.classList.remove("hide");
  gameOver = true; // sets gameOver true to block further clicks
  disableBoxes(); // disables all boxes after draw
};

// Resets the game to initial state
const resetGame = () => {
  turn_of_playerO = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.disabled = false; // when the game starts all the boxes get enabled
    box.innerText = ""; // when the new game starts so to empty the inner text
    box.classList.remove("x", "o"); // removes styling classes for fresh start
  });
  messageContainer.classList.add("hide");
};

// Disables all boxes after win or draw
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true; // if we've one winner then we can't get the other one in the same game
  });
};

// Checks if a winning pattern is achieved
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let p1 = boxes[pattern[0]].innerText;
    let p2 = boxes[pattern[1]].innerText;
    let p3 = boxes[pattern[2]].innerText;
    if (p1 && p1 === p2 && p2 === p3) {
      showWinner(p1);
      return true; // returns true if winner found to avoid checking for draw
    }
  }
  return false; // returns false if no winner found yet
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return; // prevents click if game over or box already filled

    if (turn_of_playerO) {
      box.innerText = "O";
      box.classList.add("o"); // adds class for O styling
      turn_of_playerO = false; // because it won't true for the next time
    } else {
      box.innerText = "X";
      box.classList.add("x"); // adds class for X styling
      turn_of_playerO = true; // because it won't false for the next time
    }

    // Checks for winner; if no winner, checks if board is full for draw
    if (!checkWinner()) {
      let filled = Array.from(boxes).filter(b => b.innerText !== "").length;
      // 'filled' counts total boxes having any value (X or O)
      if (filled === 9) {
        showDraw(); // if all boxes are filled and no winner, game is draw
      }
    }
  });
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
