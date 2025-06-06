// Load sounds
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const timesUpSound = new Audio("sounds/timesup.mp3");

const form = document.getElementById("quiz-form");
const resultDiv = document.getElementById("result");
const timerDisplay = document.getElementById("timer");
const retryBtn = document.getElementById("retry-btn");

let timeLeft = 60;
let timer = setInterval(updateTimer, 1000);

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    timerDisplay.textContent = "Time's up!";
    timesUpSound.play();
    submitQuiz();
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearInterval(timer);
  submitQuiz();
});

retryBtn.addEventListener("click", () => {
  location.reload(); // Refresh page to reset everything
});

function submitQuiz() {
  const q1Field = document.getElementById("q1");
  const q2Field = document.getElementById("q2");
  const q3Field = document.getElementById("q3");
  const q4Field = document.getElementById("q4");

  const q1 = q1Field.value.trim().toLowerCase();
  const q2 = q2Field.value;
  const q3 = q3Field.value.trim().toLowerCase();
  const q4 = q4Field.value.trim().toLowerCase();
  
  let score = 0;
  let playedWrongSound = false;

  // Reset styles
  [q1Field, q2Field, q3Field, q4Field].forEach(f => f.classList.remove("error", "shake"));

  if (q1 === "hypertext markup language") {
    score++;
    correctSound.play();
  } else {
    q1Field.classList.add("error", "shake");
    if (!playedWrongSound) wrongSound.play();
    playedWrongSound = true;
  }

  if (q2 === "two parts") {
    score++;
    correctSound.play();
  } else {
    q2Field.classList.add("error", "shake");
    if (!playedWrongSound) wrongSound.play();
    playedWrongSound = true;
  }
  
  if (q3 === "the role of HTML in web development is to provide the backbone and structure of a web page") {
    score++;
    correctSound.play();
  } else {
    q3Field.classList.add("error", "shake");
    if (!playedWrongSound) wrongSound.play();
    playedWrongSound = true;
  }

  if (q4 === "_ should describe the page's content succinctly and accurately") {
    score++;
    correctSound.play();
  } else {
    q4Field.classList.add("error", "shake");
    if (!playedWrongSound) wrongSound.play();
    playedWrongSound = true;
  }

  // Show result
  resultDiv.textContent = `Your score is: ${score}/4`;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("show");

  retryBtn.classList.remove("hidden");

  // Confetti if perfect
  if (score === 4 && window.confetti) {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Remove shake effect after animation
  setTimeout(() => {
    q1Field.classList.remove("shake");
    q2Field.classList.remove("shake");
    q3Field.classList.remove("shake");
    q4rField.classList.remove("shake");
  }, 500);
}
