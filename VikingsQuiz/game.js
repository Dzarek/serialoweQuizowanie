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
    question: "Jak nazywa się najmłodszy syn Aslaug?",
    choice1: "Ivar",
    choice2: "Bjorn",
    choice3: "Ubbe",
    choice4: "Vitserk",
    answer: 1,
  },
  {
    question: "Kto dzierżył tytuł jarla tuż przed Ragnarem?",
    choice1: "Sigurd",
    choice2: "Kalf",
    choice3: "Borg",
    choice4: "Haraldson",
    answer: 4,
  },
  {
    question: "Jak nazywa się kobieta, która urodziła Athelstanowi syna?",
    choice1: "Sarah",
    choice2: "Judith",
    choice3: "Janine",
    choice4: "Margaret",
    answer: 2,
  },
  {
    question: "Jedyna córka Lagerthy miała na imię... ",
    choice1: "Torvi",
    choice2: "Gyda",
    choice3: "Merida",
    choice4: "Ginny",
    answer: 2,
  },
  {
    question: "Jak określa się rodzaj śmierci, którą poniósł m.in. jarl Borg? ",
    choice1: "Krew Odyna",
    choice2: "Krwawy Niedźwiedź",
    choice3: "Krwawy Orzeł",
    choice4: "Echo Ragnaroku",
    answer: 3,
  },
  {
    question: "W którym wieku rozgrywa się akcja serialu?",
    choice1: "w IX i X",
    choice2: "w VI i VII",
    choice3: "w VIII i IX",
    choice4: "w VII i VIII",
    answer: 3,
  },
  {
    question: "Co musiał zrobić Ragnar, by Lagertha wyszła za niego za mąż?",
    choice1: "Własnymi rękami zabić wilka i niedźwiedzia",
    choice2: "Zabić panującego jarla",
    choice3: "Sprzedać 100 krów",
    choice4: "Poprosić jej ojca o zgodę",
    answer: 1,
  },
  {
    question: "Kto udał się wraz z Bjornem w podróż do Paryża?",
    choice1: "Harald",
    choice2: "Lagertha",
    choice3: "Ragnar",
    choice4: "Atelstan",
    answer: 1,
  },
  {
    question:
      "Kto przedstawił Bjornowi taktykę wojenną, która miała sprawdzić się w bitwie z Saxonami?",
    choice1: "Lagertha",
    choice2: "Ivar",
    choice3: "Bjorn miał widzenie",
    choice4: "Floki",
    answer: 2,
  },
  {
    question: "Jaki przydomek nosi Ivar?",
    choice1: "Bez nogi",
    choice2: "Żelaznoboki",
    choice3: "Okrutny",
    choice4: "Bez kości",
    answer: 4,
  },
  {
    question: "W czym Ragnar dostał się do paryskiej katedry? ",
    choice1: "W rydwanie",
    choice2: "W przebraniu kapłana",
    choice3: "W beczce",
    choice4: "W drewnianej trumnie",
    answer: 4,
  },
  {
    question:
      "Co powiedziała Lagertha do Athelstana, gdy widział on orgię wikingów? ",
    choice1: "Nie patrz",
    choice2: "Dołącz do nas",
    choice3: "Wyjdź za drzwi",
    choice4: "Spojrzyj jeszcze raz, a wyłupię ci oczy",
    answer: 2,
  },
  {
    question: "Dlaczego król Horik wysłał Ragnara do Gotlandii?",
    choice1: "By zabić tamtejszego jarla Borga",
    choice2: "By rozstrzygnąć spór terytorialny z jarlem Borgiem",
    choice3: "By sprawdzić czy ta ziemia nadaje się do podboju",
    choice4: "W celu splądrowania terytorium",
    answer: 2,
  },
  {
    question: "Czym zajmuje się Floki?",
    choice1: "Był szamanem",
    choice2: "Był nauczycielem",
    choice3: "Był budowniczym łodzi",
    choice4: "Był wieszczem",
    answer: 3,
  },
  {
    question: "Kto dowodził obroną Paryża w czasie ataku wikingów?",
    choice1: "Rollo",
    choice2: "Rolland",
    choice3: "Hrabia Odo",
    choice4: "Harald",
    answer: 3,
  },
  {
    question:
      "Gdzie Ragnar i Lagherta ukryli się przed armią jarla Haraldsona? ",
    choice1: "W Gottlandi",
    choice2: "W domu rodziców Helgi",
    choice3: "W domu Flokiego i Helgi",
    choice4: "Nie ukrywali się",
    answer: 3,
  },
  {
    question: "Kiedy według Wieszcza miał zginąć Ragnar?",
    choice1: "Gdy wąż wpełznie do swej jamy",
    choice2: "Gdy zobaczy go ślepiec",
    choice3: "Gdy na niebie pojawi się kruk",
    choice4: "Gdy na niebie pojawi się orzeł",
    answer: 2,
  },
  {
    question: "Kto wyruszył wraz z Ragnarem w jego ostatnią podróż do Anglii?",
    choice1: "Ivar",
    choice2: "Floki",
    choice3: "Bjorn",
    choice4: "Ubbe",
    answer: 1,
  },
  {
    question: "Gdzie dopłynął Floki?",
    choice1: "Na Grenlandię",
    choice2: "Na Islandię",
    choice3: "Do Wysp Owczych",
    choice4: "Do Kanady",
    answer: 2,
  },
  {
    question:
      "Co Rollo powiedział Bjornowi, gdy namawiał go, aby wrócił z nim do Francji? ",
    choice1: "Że czeka tam na niego bogactwo",
    choice2: "Że jest jego biologicznym ojcem",
    choice3: "Jeśli tego nie zrobi to zaatakuje Kattegat",
    choice4: "Tam otrzyma chrzest",
    answer: 2,
  },
  {
    question: "Gdzie uciekł Ivar po przegranej bitwie o Kattegat? ",
    choice1: "Do Kairu",
    choice2: "Na Sycylię",
    choice3: "Do Germanii",
    choice4: "Na Ruś Kijowską",
    answer: 4,
  },
  {
    question: "Kim był Oleg dla księcia Igora?",
    choice1: "Ojcem",
    choice2: "Wujkiem",
    choice3: "Bratem",
    choice4: "Nie byli spokrewnieni",
    answer: 2,
  },
  {
    question: "Gdzie zginęła Lagertha?",
    choice1: "W napadniętej przez Białowłosego wiosce",
    choice2: "W Kijowie",
    choice3: "W Kattegat",
    choice4: "W Paryżu",
    answer: 3,
  },
  {
    question: "Jak zginął Bjorn?",
    choice1: "Został przebity mieczem przez Ivara",
    choice2: "Umarł we śnie od swoich ran",
    choice3: "Zmarł na polu bitwy od ran i strzał w walce przeciwko Rusom",
    choice4: "Jego cierpienia skróciła Gunnhilda",
    answer: 3,
  },
  {
    question:
      "Gdzie dopłynęli Ubbe i Torvi, skąd musieli uciekać po buncie wywołanym przez Kjetilla?",
    choice1: "Na Grenlandię",
    choice2: "Na Islandię",
    choice3: "Do Wysp Owczych",
    choice4: "Do Północnej Ameryki",
    answer: 1,
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
    localStorage.setItem("mostRecentScore5", score);

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
