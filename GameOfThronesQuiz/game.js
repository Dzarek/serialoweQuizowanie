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
    question: "Kto podarował Daenerys smocze jaja? ",
    choice1: "Illyrio Mopatis",
    choice2: "Khal Drogo",
    choice3: "Jorah Mormont",
    choice4: "Ned Stark",
    answer: 1,
  },
  {
    question: "Gdzie po raz pierwszy spotykamy Tyriona Lannistera?",
    choice1: "W karocy królewskiego orszaku",
    choice2: "W domu uciech w Winterfell",
    choice3: "Podczas bankietu",
    choice4: "W karczmie",
    answer: 2,
  },
  {
    question: "Jak się nazywa miecz, który Aryia Stark dostała od Jona Snowa?",
    choice1: "Igła",
    choice2: "Żądło",
    choice3: "Ostrze",
    choice4: "Szpilka",
    answer: 1,
  },
  {
    question:
      "Czym w czasie wojny zajmuje się Talisa Maegy, przyszła żona Roba Starka?",
    choice1: "Pomaga w polowej kuchni",
    choice2: "Jest łuczniczką i chce wstąpić do armii",
    choice3: "Jest dziwką",
    choice4: "Opatruje rannych",
    answer: 4,
  },
  {
    question:
      "Jak nazywała się substancja, którą wysadzono flotę Stannisa Baratheona?",
    choice1: "Zimny ogień",
    choice2: "Zielony ogień",
    choice3: "Dziki ogień",
    choice4: "Wieczny ogień",
    answer: 3,
  },
  {
    question: "Lannister zawsze...",
    choice1: "jest najlepszy",
    choice2: "wygrywa",
    choice3: "spłaca swoje długi",
    choice4: "śmieje się ostatni",
    answer: 3,
  },
  {
    question: "Za co w Westeros skazano Jorah Mormont?",
    choice1: "Za dezercję",
    choice2: "Za handel niewolnikami",
    choice3: "Za kłusownictwo",
    choice4: "Za upicie się",
    answer: 2,
  },
  {
    question: "Kto otruł Joffreya Lannistera na jego weselu?",
    choice1: "Arya Stark",
    choice2: "Olenna Tyrell",
    choice3: "Littlefinger",
    choice4: "Tyrion Lannister",
    answer: 2,
  },
  {
    question: "Za co Oberyn Martell chce się zemścić na Lannisterach?",
    choice1: "Za śmierć swojej siostry",
    choice2: "Za straconą na ich rzecz fortunę",
    choice3: "Za wyśmianie go w towarzystwie",
    choice4: "Za lata spędzone na wygnaniu",
    answer: 1,
  },
  {
    question: "Jak nazywał się Król za Murem?",
    choice1: "Mance Rayder",
    choice2: "Will Termond",
    choice3: "Tormund",
    choice4: "Jeor Mormont",
    answer: 1,
  },
  {
    question: "Jak był nazywany Jaime Lannister?",
    choice1: "Zimnoręki",
    choice2: "Jednoręki",
    choice3: "Królobójca",
    choice4: "Zabójca olbrzyma",
    answer: 3,
  },
  {
    question: "Jak zginął brat Daenerys, Viserys Targaryen?",
    choice1: "Śmiercią głodową na wygnaniu",
    choice2: "Zabity przez Lannisterów na Skale",
    choice3: "Z ręki khala Drogo, który wylał na niego płynne złoto",
    choice4:
      "Wpadł w szał i chcąc zaatakować Daenerys, zabił go jeden ze smoków",
    answer: 3,
  },
  {
    question: "Kim jest Szary Robak?",
    choice1: "Handlarzem niewolników",
    choice2: "Jednym z Nieskalanych",
    choice3: "Protektorem Królestwa",
    choice4: "Synem harpii",
    answer: 2,
  },
  {
    question:
      "Sześć wilkorów dla sześciu potomków Eda Starka. Który z nich przeżył?",
    choice1: "Szary Wicher",
    choice2: "Dama",
    choice3: "Lato",
    choice4: "Nymeria",
    answer: 4,
  },
  {
    question: "Komu za żonę nie była dana ani obiecana Sansa Stark?",
    choice1: "Tyrionowi Lannisterowi",
    choice2: "Ramsayowi Boltonowi",
    choice3: "Księciu Joffreyowi",
    choice4: "Ser Lorasowi Tyrellowi",
    answer: 4,
  },
  {
    question:
      "Przez kogo Cersei skazana była na przemarsz pokutny przez całą stolicę Siedmiu Królestw, Królewską Przystań?",
    choice1: "Varysa",
    choice2: "Wielkiego Septona",
    choice3: "Wielkiego Wróbla",
    choice4: "Jamie'ego Lannistera",
    answer: 3,
  },
  {
    question:
      "Jak zginął Tywin Lannister, nestor rodu i twórca rodzinnej potęgi?",
    choice1: "Został zastrzelony z kuszy podczas srania",
    choice2: "Zginął na polu bitwy",
    choice3: "Został zabity przez smoka",
    choice4: "Stał się ofiarą intrygi swoich dzieci",
    answer: 1,
  },
  {
    question: "Czego bał się Sandor Clegane zwany Ogarem?",
    choice1: "Ognia",
    choice2: "Wody",
    choice3: "Gwoździ",
    choice4: "Psów",
    answer: 1,
  },
  {
    question: "Jak miała na imię pierwsza ukochana Jona Snowa?",
    choice1: "Jacynta",
    choice2: "Ygritte",
    choice3: "Rosie",
    choice4: "Creline",
    answer: 2,
  },
  {
    question:
      "Jak zginął Oberyn Martell, podczas pojedynku, w którym reprezentował Tyriona Lannistera?",
    choice1: "Został przebity przez włócznię Jamie'ego Lannistera",
    choice2: "Jego czaszka została rozłupana przez Górę ",
    choice3: "Zmarł na skutek działania trucizny danej mu przez Cersei",
    choice4: "Nie zginął",
    answer: 2,
  },
  {
    question: "Melisandre to kapłanka...",
    choice1: "Siedmiu Nowych Bogów",
    choice2: "Utopionego Boga",
    choice3: "R’hllora, Pana Światła",
    choice4: "Pani Fal i Pana Nieba",
    answer: 3,
  },
  {
    question: "Kto wypchnął Brana Starka z wieży w Winerfell? ",
    choice1: "Cersei Lannister",
    choice2: "Jaime Lannister",
    choice3: "Jon Snow",
    choice4: "Tyrion Lannister",
    answer: 2,
  },
  {
    question: "Co poza smoczym szkłem jest w stanie zabić Białego Wędrowca? ",
    choice1: "Czardrzewo",
    choice2: "Dziki ogień",
    choice3: "Smok",
    choice4: "Stal Valyriańska",
    answer: 4,
  },
  {
    question: "Jak się nazywają informatorzy Varysa?",
    choice1: "Kocięta Pana",
    choice2: "Kacze Nasienie",
    choice3: "Małe ptaszki",
    choice4: "Słudzy Niepana",
    answer: 3,
  },
  {
    question: "Partnerka Samwella Tarly'ego ma na imię...",
    choice1: "Lukrecja",
    choice2: "Goździk",
    choice3: "Carmen",
    choice4: "Anyssus",
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
    localStorage.setItem("mostRecentScore4", score);

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
