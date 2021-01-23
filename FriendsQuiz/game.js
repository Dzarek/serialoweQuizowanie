const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "W którym roku serial zadebiutował w amerykańskiej telewizji? ",
    choice1: "1994",
    choice2: "1995",
    choice3: "1996",
    choice4: "1997",
    answer: 1,
  },
  {
    question:
      "Kto był pierwszym współlokatorem Moniki w mieszkaniu na Manhattanie? ",
    choice1: "Ross",
    choice2: "Rachel",
    choice3: "Chandler",
    choice4: "Phoebe",
    answer: 4,
  },
  {
    question: "Jak miała na imię małpka Rossa? ",
    choice1: "Marcel",
    choice2: "Marco",
    choice3: "Michael",
    choice4: "Miguel",
    answer: 1,
  },
  {
    question:
      "Za kogo przebrał się Ross, by opowiedzieć swojemu synowi o Hanuce?",
    choice1: "Świętego Mikołaja ",
    choice2: "Gigantycznego ziemniaka ",
    choice3: "Pancernika",
    choice4: "Supermana",
    answer: 3,
  },
  {
    question: "Kto jako drugi dowiedział się o związku Moniki i Chandlera?",
    choice1: "Phoebe",
    choice2: "Ross",
    choice3: "Rachel",
    choice4: "Joey",
    answer: 3,
  },
  {
    question: "W którym popularnym teleturnieju wystąpił Joey? ",
    choice1: "Milionerzy",
    choice2: "Piramida",
    choice3: "Koło fortuny",
    choice4: "Awantura o kasę",
    answer: 2,
  },
  {
    question: "Jakie drugie imię ma Chandler?",
    choice1: "Marc",
    choice2: "Muriel",
    choice3: "Majesty",
    choice4: "Magee",
    answer: 2,
  },
  {
    question:
      "W jednym z odcinków Joey decyduje się na przeczytanie Małych kobietek. A Rachel?",
    choice1: "Lśnienie",
    choice2: "Carrie",
    choice3: "Dracula",
    choice4: "Cujo",
    answer: 1,
  },
  {
    question: "Ile sióstr ma Joey?",
    choice1: "Pięć",
    choice2: "Szcześć",
    choice3: "Siedem",
    choice4: "Osiem",
    answer: 3,
  },
  {
    question:
      "Jaką umiejętność wpisaną w CV Joey chciał zdobyć w ramach postanowienia noworocznego?",
    choice1: "Nauczyć się grać na gitarze",
    choice2: "Nauczyć się francuskiego",
    choice3: "Nauczyć się prowadzić samochód",
    choice4: "Nauczyć się tańca współczesnego",
    answer: 1,
  },
  {
    question:
      "Dobry znajomy Rossa i Chandlera, z którym chodzili na szalone imprezy, to:",
    choice1: "Gollum",
    choice2: "Gimli",
    choice3: "Frodo",
    choice4: "Gandalf",
    answer: 4,
  },
  {
    question:
      "Jakiego koloru był sweter, dzięki któremu bohaterowie dowiedzieli się, kto jest ojcem dziecka Rachel?",
    choice1: "niebieski",
    choice2: "czerwony",
    choice3: "zielony",
    choice4: "łososiowy",
    answer: 2,
  },
  {
    question: "Chandler został zamknięty w skrzyni, ponieważ:",
    choice1: "Nie pamiętał, którą z sióstr Joeya pocałował",
    choice2: "Zepsuł ulubiony fotel Joeya",
    choice3: "Poinformował Joeya o przeprowadzce",
    choice4: "Pocałował dziewczynę Joeya",
    answer: 4,
  },
  {
    question:
      "Jak nazywał się mężczyzna, któremu Rachel uciekła sprzed ołtarza?",
    choice1: "Barry",
    choice2: "Berry",
    choice3: "Bill",
    choice4: "Bernard",
    answer: 1,
  },
  {
    question: "Kto zapoznał Phoebe i Mike`a? ",
    choice1: "Joey",
    choice2: "Monica",
    choice3: "Chandler",
    choice4: "Rachel",
    answer: 1,
  },
  {
    question:
      "Chandler, chcąc uniknąc Janice, mówi jej, że musi się wyprowadzić do... ",
    choice1: "Chin",
    choice2: "Jemenu",
    choice3: "Wietnamu",
    choice4: "Francji",
    answer: 2,
  },
  {
    question: "Jak miały na imię dzieci Franka i Alice? ",
    choice1: "Frank Jr., Leslie, Joey.",
    choice2: "Frank Jr., Monica, Rachel.",
    choice3: "Frank Jr. Jr., Leslie, Chandler.",
    choice4: "Monica, Rachel, Joey.",
    answer: 3,
  },
  {
    question: "Kto z przyjaciół jest najmłodszy?",
    choice1: "Rachel",
    choice2: "Joey",
    choice3: "Ross",
    choice4: "Chandler",
    answer: 1,
  },
  {
    question: "W jaki sposób Joey wspołprzeżywał poród Phoebe?",
    choice1: "chorując na kamicę nerkową",
    choice2: "będąc na holu szpitalnym",
    choice3: "będąc przy porodzie Phoebe",
    choice4: "pomagając ginekologowi",
    answer: 1,
  },
  {
    question: "Z czyim słynnym synem do klasy chodził syn Rossa?",
    choice1: "Z synem Slasha",
    choice2: "Z synem Brada Pitta",
    choice3: "Z synem Bruce Willisa",
    choice4: "Z synem Stinga",
    answer: 4,
  },
  {
    question: "Co zachwalał Joey, gdy występował w japońskiej reklamie?",
    choice1: "Koc w kształcie pizzy ",
    choice2: "Zupkę o smaku pepsi ",
    choice3: "Szminkę dla mężczyzn ",
    choice4: "Koronkowe krawaty dla biznesmenów ",
    answer: 3,
  },
  {
    question:
      "Co miała Monica na głowie, gdy Chandler po raz pierwszy wyznał jej miłość?",
    choice1: "Sombrero",
    choice2: "Cylinder",
    choice3: "Indyka",
    choice4: "Uszy królika",
    answer: 3,
  },
  {
    question: "Kim jest Regina Phalange?",
    choice1: "Pierwszą miłością Chandlera ",
    choice2: "Złośliwą szefową Rachel ",
    choice3: "Właścielką mieszkań, w których mieszkają bohaterowie ",
    choice4: "Alter ego Phoebe ",
    answer: 4,
  },
  {
    question: "Który tom encyklopedii Joey kupuje od akwizytora?",
    choice1: "W",
    choice2: "B",
    choice3: "J",
    choice4: "V",
    answer: 1,
  },
  {
    question: "Kto z przyjaciół ma trzy sutki?",
    choice1: "Ross",
    choice2: "Chandler",
    choice3: "Joey",
    choice4: "Żaden z nich",
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 25;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore3", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Pytanie ${questionCounter} z ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
