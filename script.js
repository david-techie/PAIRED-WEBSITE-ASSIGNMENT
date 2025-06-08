const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which tag is used to embed JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1,
  },
  {
    question: "Which tag defines a paragraph in HTML?",
    options: ["<para>", "<text>", "<p>", "<paragraph>"],
    correct: 2,
  },
];

const form = document.getElementById("quiz-form");
const result = document.getElementById("result");

function renderQuiz() {
  questions.forEach((q, index) => {
    const block = document.createElement("div");
    block.classList.add("question-block");

    const questionTitle = document.createElement("div");
    questionTitle.classList.add("question");
    questionTitle.innerText = `${index + 1}. ${q.question}`;
    block.appendChild(questionTitle);

    const options = document.createElement("div");
    options.classList.add("options");

    q.options.forEach((option, i) => {
      const inputId = `q${index}_opt${i}`;
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = i;
      input.id = inputId;

      label.setAttribute("for", inputId);
      label.appendChild(input);
      label.append(` ${option}`);
      options.appendChild(label);
    });

    block.appendChild(options);
    form.appendChild(block);
  });
}

function checkAnswers() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = form.querySelector(`input[name="q${index}"]:checked`);
    const labels = form.querySelectorAll(`input[name="q${index}"]`);

    labels.forEach(input => {
      const label = input.parentElement;
      label.classList.remove("correct", "wrong");

      if (parseInt(input.value) === q.correct) {
        label.classList.add("correct");
      }
    });

    if (selected && parseInt(selected.value) === q.correct) {
      score++;
    } else if (selected) {
      selected.parentElement.classList.add("wrong");
    }
  });

  result.innerText = `✅ You scored ${score} out of ${questions.length}`;
}

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  checkAnswers();
});

renderQuiz();
