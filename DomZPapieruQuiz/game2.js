const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const clock = document.querySelector(".clock");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let time = 15;

let questions = [
  {
    question: "W jakim mieście dochodzi do napadu na mennicę?",
    choice1: "Barcelona",
    choice2: "Madryt",
    choice3: "Sewilla",
    choice4: "Walencja",
    answer: 2,
  },
  {
    question: "Jaką sumę pieniędzy wydrukowali przestępcy?",
    choice1: "904 mln euro",
    choice2: "994 mln euro",
    choice3: "984 mln euro",
    choice4: "998 mln euro",
    answer: 3,
  },
  {
    question: "Która z tych par nie miała ze sobą dobrych relacji?",
    choice1: "Rio i Tokio",
    choice2: "Helsinki i Oslo",
    choice3: "Denver i Moskwa",
    choice4: "Berlin i Nairobi",
    answer: 4,
  },
  {
    question: "Jak brzmi prawdziwe nazwisko Profesora?",
    choice1: "Augustin Ramos",
    choice2: "Andres de Fonollosa",
    choice3: "Sergio Marquina",
    choice4: "Anibal Cortes",
    answer: 3,
  },
  {
    question:
      "Kto wpadł na pomysł napadu na hiszpańską mennicę narodową i stworzył jego plan?",
    choice1: "Profesor",
    choice2: "Angel",
    choice3: "Nairobi",
    choice4: "ojciec Profesora",
    answer: 4,
  },
  {
    question: "Na jaką chorobę cierpiała matka Raquel?",
    choice1: "choroba Parkinsona",
    choice2: "niewydolność serca",
    choice3: "choroba Huntingtona",
    choice4: "choroba Alzheimera",
    answer: 4,
  },
  {
    question: "Jak długo Profesor przygotowywał się do pierwszego napadu?",
    choice1: "dniami",
    choice2: "tygodniami",
    choice3: "miesiącami",
    choice4: "latami",
    answer: 4,
  },
  {
    question: "Część którego narządu straciła Nairobi podczas usuwania kuli?",
    choice1: "płuca",
    choice2: "nerki",
    choice3: "wątroby",
    choice4: "śledziony",
    answer: 1,
  },
  {
    question:
      "Gdzie znajduje się dom, w którym ekipa razem z Profesorem planowała napad na mennicę? ?",
    choice1: "w Toledo",
    choice2: "w Madrycie",
    choice3: "w Walencji",
    choice4: "w Sewilli",
    answer: 1,
  },
  {
    question: "Kto jest biologicznym ojcem dziecka Moniki?",
    choice1: "Denver",
    choice2: "Arturo",
    choice3: "Rio",
    choice4: "nie wiadomo",
    answer: 2,
  },
  {
    question: "Kto w serialu śpiewał piosenkę Ti Amo?",
    choice1: "Palermo",
    choice2: "Profesor",
    choice3: "Berlin",
    choice4: "Denver",
    answer: 3,
  },
  {
    question: "Na co był chory Berlin?",
    choice1: "Miopatia Hellmera",
    choice2: "Niewydolność serca",
    choice3: "Miał raka",
    choice4: "Homopatia Hellmera",
    answer: 4,
  },
  {
    question: "Czyj głos ma narrator?",
    choice1: "Tokio",
    choice2: "Profesora",
    choice3: "Nairobi",
    choice4: "Lizbony",
    answer: 1,
  },
  {
    question: "Prawdziwe imię Denvera to ...",
    choice1: "Paco",
    choice2: "Martin",
    choice3: "Ricardo",
    choice4: "Miguel",
    answer: 3,
  },
  {
    question: "Co jeden z policjantów pokazał Lizbonie podczas przesłuchania?",
    choice1: "długopis",
    choice2: "zegarek",
    choice3: "kawę",
    choice4: "telefon",
    answer: 2,
  },
  {
    question: "Kim był Berlin dla Profesora?",
    choice1: "bratem",
    choice2: "przyjacielem",
    choice3: "wrogiem",
    choice4: "kuzynem",
    answer: 1,
  },
  {
    question: "W 3 sezonie ekipa Profesora napadła na ...",
    choice1: "Mennicę w Hiszpanii",
    choice2: "Bank Narodowy w Hiszpanii",
    choice3: "Ministerstwo Finansów",
    choice4: "Pałac Królewski w Madrycie",
    answer: 2,
  },
  {
    question: "Kto odkrył w 4 sezonie kryjówkę Profesora? ",
    choice1: "Raquel Murillo",
    choice2: "Marsylia",
    choice3: "Alicia Sierra",
    choice4: "Angel",
    answer: 3,
  },
  {
    question:
      "O co pyta Profesor inspektor Murillo w trakcie ich pierwszych negocjacji?",
    choice1: "O to, jak jest ubrana",
    choice2: "Czy chce do nich dołączyć",
    choice3: "Czy pamięta swój pierwszy seks",
    choice4: "Czy spotkają się prywatnie",
    answer: 1,
  },
  {
    question: "Kto zdecydował się oddać Tokio w ręce policji?",
    choice1: "Profesor za nieposłuszeństwo",
    choice2: "Denver za złamanie zasad",
    choice3:
      "Berlin, za to, że grała z nim w rosyjską ruletkę i złamała zasady",
    choice4: "Rio za odrzucenie miłosne",
    answer: 3,
  },
  {
    question: "Gdzie Raquel spotyka Profesora rok po napadzie?",
    choice1: "na Bora Bora",
    choice2: "w Tajlandii",
    choice3: "na wyspie Fidżi",
    choice4: "na wyspie Palawan",
    answer: 4,
  },
  {
    question: "Po czym Raquel domyśla się, że Salva to Profesor?",
    choice1: "Po głosie",
    choice2: "Po pomarańczowym włosku na jego marynarce",
    choice3: "Po resztkach makijażu klowna",
    choice4: "Po zielonym włosku na jego marynarce",
    answer: 2,
  },
  {
    question: "Kogo chciał zabić Profesor dosypując trucizny do kawy?",
    choice1: "Matkę Raquel",
    choice2: "Rio",
    choice3: "Byłego męża Raquel",
    choice4: "Raquel",
    answer: 1,
  },
  {
    question: "Kto spowodował wypadek, po którym Angel zapada w śpiączkę?",
    choice1: "Suarez",
    choice2: "Raquel",
    choice3: "Profesor",
    choice4: "Angel",
    answer: 4,
  },
  {
    question:
      "Co przekazuje Alicia Sierra ekipie Profesora, co dekocentruje Nairobi?",
    choice1: "Czołg",
    choice2: "Bombę",
    choice3: "Samochodzik",
    choice4: "Pluszowego misia",
    answer: 4,
  },
  {
    question:
      "Maski z podobizną jakiego słynnego artysty nosi ekipa Profesora?",
    choice1: "Salvadora Dali",
    choice2: "Pablo Picassa",
    choice3: "Leonarda da Vinci",
    choice4: "Ernesta Hemingwaya",
    answer: 1,
  },
  {
    question: "Jak policji udało się schwytać Rio?",
    choice1: "Tokio go wydała",
    choice2: "Turyści go zobaczyli",
    choice3: "Namierzyli jego komputer",
    choice4: "Namierzyli jego telefon, gdy rozmawiał z Tokio",
    answer: 4,
  },
];

const SCORE_POINTS = 150;
const MAX_QUESTIONS = 25;
clock.innerText = time;

const timer = () => {
  showTime = () => {
    time--;
    clock.innerText = time;
    if (time === 0) {
      time = 16;
    }
    if (time <= 5) {
      clock.classList.add("fiveSeconds");
    }
    if (time >= 6) {
      clock.classList.remove("fiveSeconds");
    }
  };
  return showTime;
};
const aaa = timer();
let bbb = setInterval(aaa, 1000);

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore2", score);

    return window.location.assign("end2.html");
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
      clearInterval(answerTime);
      answerTime = setInterval(() => {
        getNewQuestion();
      }, 17000);

      clearInterval(bbb);
      time = 16;
      bbb = setInterval(aaa, 1000);
    }

    if (classToApply === "incorrect") {
      decrementScore(SCORE_POINTS);
      clearInterval(answerTime);
      answerTime = setInterval(() => {
        getNewQuestion();
      }, 17000);

      clearInterval(bbb);
      time = 16;
      bbb = setInterval(aaa, 1000);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

let answerTime = setInterval(() => {
  getNewQuestion();
}, 16000);

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

decrementScore = (num) => {
  score -= num;
  scoreText.innerText = score;
};

startGame();
