let userScore = 0;
let computerScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreParagraph = document.querySelector("#user-score");
const computerScoreParagraph = document.querySelector("#computer-score");
const generateComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
};
const drawGame = () => {
  msg.innerText = "Game Was Draw. Play Again.";
  msg.style.backgroundColor = "#081b31";
};
const showWinner = (userWin, userChoice, computerChoice) => {
  if (userWin) {
    userScore++;
    userScoreParagraph.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${computerChoice}.`;
    msg.style.backgroundColor = "green";
  } else {
    computerScore++;
    computerScoreParagraph.innerText = computerScore;
    msg.innerText = `You Lost! ${computerChoice} beats Your ${userChoice}.`;
    msg.style.backgroundColor = "red";
  }
};
const playGame = (userChoice) => {
  const computerChoice = generateComputerChoice();
  if (userChoice === computerChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = computerChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = computerChoice === "scissors" ? false : true;
    } else {
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, computerChoice);
  }
};
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
