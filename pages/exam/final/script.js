const questionDataURL = "../../../resources/data/question.json";

const mainElement = document.getElementsByTagName("main");

const containerLeft = document.getElementById("container-left");
const questionTitle = document.getElementById("question-title");
const questionTable = document.getElementById("question-table");

const containerRight = document.getElementById("container-right");
const cardBody = document.getElementById("card-body");

const modalContainer = document.getElementById("modal-container");

let currentIndex = 0;
let testLength = 0;
let score = 0;
let selectedAnswers = [];
let questionData = [];

function startTest() {
  currentIndex = 0;
  score = 0;
  selectedAnswers = [];

  for (let i = 0; i < 50; i++) {
    selectedAnswers[i] = chooseRandomAnswer();
  }

  getQuestionData().then((data) => {
    questionData = shuffleQuestion(data.slice(0, 50));
    startTimer();
    showQuestion();
  });
}

function showQuestion() {
  containerLeft.innerHTML = "";
  cardBody.innerHTML = "";

  testLength = questionData.length;

  questionData.forEach((question, index) => {
    const currentQuestion = question;
    currentIndex = index;
    const testContainer = createTestContainer(currentQuestion, currentIndex);
    containerLeft.appendChild(testContainer);

    const answerButtons = document.querySelectorAll(`.answer-${index}`);
    answerButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        handleAnswerButtonSelection(index, event);
        highlightSelectedAnswers(index);
        showQuestion();
      })
    );

    highlightSelectedAnswers(index);
  });

  const questionTable = createQuestionTable();
  cardBody.appendChild(questionTable);

  const confirmSubmit = document.getElementById("confirm-btn");
  confirmSubmit.addEventListener("click", showResult);
}

function createTestContainer(currentQuestion, currentIndex) {
  const testContainer = document.createElement("div");
  testContainer.setAttribute("class", "test-container");
  testContainer.setAttribute("data-index", currentIndex);
  testContainer.innerHTML = `
    <hr>
    <p id="question-title" class="">Question ${currentIndex + 1}:
    <br>
    ${currentQuestion.question}</p>
    <div class="row">
      ${createAnswerButton(currentQuestion.A, currentIndex, "a")}
      ${createAnswerButton(currentQuestion.B, currentIndex, "b")}
      ${createAnswerButton(currentQuestion.C, currentIndex, "c")}
      ${createAnswerButton(currentQuestion.D, currentIndex, "d")}
    </div>
  `;
  return testContainer;
}

function createAnswerButton(answer, index, id) {
  return `
    <div class="p-2 g-col-6 d-flex flex-column">
      <button id="${id}" type="button" class="answer-${index} text-start btn btn-outline-danger"> ${id.toUpperCase()}. ${answer}</button>
    </div>
  `;
}

function createQuestionTable() {
  const questionTable = document.createElement("div");
  questionTable.setAttribute("id", "question-table");
  questionTable.innerHTML = `
    ${questionData
      .map((question, index) => {
        return `<button type="button" class="btn btn-outline-danger jump-to-question ${
          selectedAnswers[index] ? "text-white btn-danger" : ""
        }" data-index=${index}">${index + 1}</button>`;
      })
      .join("")}
  `;
  return questionTable;
}

function handleAnswerButtonSelection(index, event) {
  const selectedButton = event.target;
  const selectedIndex = selectedButton.getAttribute("id");

  const answerButtons = document.querySelectorAll(`.answer-${index}`);
  answerButtons.forEach((button) => {
    button.classList.remove("btn-danger");
    button.classList.remove("text-white");
  });

  selectedButton.classList.add("text-white");
  selectedButton.classList.add("btn-danger");
  selectedAnswers[index] = selectedIndex;

  console.log(selectedAnswers);
}

function highlightSelectedAnswers(index) {
  const answerButtons = document.querySelectorAll(`.answer-${index}`);
  answerButtons.forEach((button) => {
    const buttonIndex = button.getAttribute("id");
    if (selectedAnswers[index] === buttonIndex) {
      button.classList.add("text-white");
      button.classList.add("btn-danger");
    }
  });
}

function showResult() {
  // Calculate score
  let score = 0;
  selectedAnswers.forEach((selectedAnswer, index) => {
    const question = questionData[index];
    if (
      selectedAnswer &&
      selectedAnswer.toLowerCase() === question.answer.toLowerCase()
    ) {
      score++;
    }
  });

  // Display the score in the modal
  const scoreDisplay = `Bạn đạt ${score}/${questionData.length} điểm`;

  // The rest of the function remains the same...
  const disableAllQuestions = containerLeft.querySelectorAll(
    ".test-container button"
  );
  disableAllQuestions.forEach((button) => {
    button.classList.remove("text-white");
    button.disabled = true;
  });

  // Remove existing modal content
  const existingModal = document.querySelector(".modal-content");
  if (existingModal) {
    existingModal.remove();
  }

  // Create new modal content
  const modalContent = `
      <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              ${scoreDisplay}

              <div class="">
                  ${questionData
                    .map((question, index) => {
                      const selectedAnswer = selectedAnswers[index];
                      const isCorrect =
                        selectedAnswer &&
                        selectedAnswer.toLowerCase() ===
                          question.answer.toLowerCase();
                      const options = ["A", "B", "C", "D"];

                      return `
                          <hr>
                          <p class="">Question ${index + 1}:</br>${
                        question.question
                      }</p>
                          <div class="row">
                              ${options
                                .map(
                                  (option) => `
                                  <div class="p-2 g-col-6 d-flex flex-column">
                                      <button type="button" class="text-start btn ${
                                        selectedAnswer &&
                                        selectedAnswer.toLowerCase() ===
                                          option.toLowerCase()
                                          ? isCorrect
                                            ? "btn-success"
                                            : "btn-danger"
                                          : question.answer.toLowerCase() ===
                                            option.toLowerCase()
                                          ? "btn-success"
                                          : "btn-outline-danger"
                                      }" disabled>${option}. ${
                                    question[option]
                                  }</button>
                                  </div>
                              `
                                )
                                .join("")}
                          </div>
                      `;
                    })
                    .join("")}
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="text-white btn btn-secondary" data-bs-dismiss="modal">
                  <a href="../../subject/cnxhkh.html">Trở Lại</a>
              </button>
          </div>
      </div>
  `;

  const modalDialog = document.querySelector(".modal-dialog");
  modalDialog.innerHTML = modalContent;
}

async function getQuestionData() {
  try {
    const response = await fetch(questionDataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching question data:", error);
    return [];
  }
}

function chooseRandomAnswer() {
  const answers = ["A", "B", "C", "D", ""];
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

function shuffleQuestion(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//TIMER
const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

const hr = 0;
const min = 0;
const sec = 10;

const setTime = hr * 3600000 + min * 60000 + sec * 1000;
const startTime = Date.now();
const futureTime = startTime + setTime;

let timeLoop;

function startTimer() {
  timeLoop = setInterval(countDownTimer);
  countDownTimer();
}

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  if (angle > 180) {
    semicircles[2].style.display = "none";
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = "block";
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }

  const hrs = Math.floor(
    (remainingTime / (1000 * 60 * 60)) % 24
  ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
  <div>${hrs}</div>
  <div class='colon'>:</div>
  <div>${mins}</div>
  <div class='colon'>:</div>
  <div>${secs}</div>`;

  if (remainingTime < 0) {
    clearInterval(timeLoop);
    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";

    timer.innerHTML = `
    <div>00</div>
    <div class='colon'>:</div>
    <div>00</div>
    <div class='colon'>:</div>
    <div>00</div>`;

    showResult();
  }
}

startTest();
