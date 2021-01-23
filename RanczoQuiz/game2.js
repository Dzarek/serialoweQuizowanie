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
    question:
      "W drugiej serii Kusy postanowił rzucić się pod autobus PKS, wpadł jednak…",
    choice1: "pod samochód Czerepacha",
    choice2: "do rowu",
    choice3: "pod rower Solejuka",
    choice4: "pod traktor Wargacza",
    answer: 3,
  },
  {
    question: "Jak nazywała się restauracja, która spłonęła w pożarze?",
    choice1: "U Wioletki",
    choice2: "Country Club",
    choice3: "Małe Ranczo",
    choice4: "U Japycza",
    answer: 2,
  },
  {
    question:
      "Czerepach wrócił do Wilkowyj po tym, jak dorobił się zagranicą. Z jakiego miasta?",
    choice1: "Z Brukseli",
    choice2: "Z Chicago",
    choice3: "Z Luksemburgu",
    choice4: "Z Berlina",
    answer: 1,
  },
  {
    question: "Jakiej narodowości był mąż Weroniki Więcławskiej?",
    choice1: "Był Anglikiem",
    choice2: "Był Chińczykiem",
    choice3: "Był Wietnamczykiem",
    choice4: "Był Koreańczykiem",
    answer: 2,
  },
  {
    question: "Kto porwał Lucy dla okupu?",
    choice1: "Myćko i Wargacz",
    choice2: "Solejuk i Pietrek",
    choice3: "Cała Ławeczka",
    choice4: "Solejuk i Hadziuk",
    answer: 4,
  },
  {
    question:
      "Walcząca z męskim protestem Lucy postanowiła sama dosiąść się do pikiety mieszkańców. Czym zakończył się wspólny protest?",
    choice1: "Bójką",
    choice2: "Interwencją służb specjalnych",
    choice3: "Awanturą Kusego u Proboszcza",
    choice4: "Kacem",
    answer: 4,
  },
  {
    question:
      "Gdy Solejukowa postanowiła zdać maturę, jej małżonek w akcie zemsty postanowił zostać…",
    choice1: "policjantem",
    choice2: "politykiem",
    choice3: "świadkiem koronnym",
    choice4: "producentem piwa",
    answer: 3,
  },
  {
    question:
      "Magister Polakowski początkowo nie ufał Babce i miał z nią konflikt. Babka rzuciła na niego czar w wyniku czego… ",
    choice1: "zaczoł się jąkać",
    choice2: "stracił węch",
    choice3: "zaczoł ostro pić",
    choice4: "spowodowała jego amnezję",
    answer: 1,
  },
  {
    question:
      "Ksiądz Robert zniknął na jakiś czas z serialu. Co działo się z nim w tym czasie?",
    choice1: "wyjechał na misję do Afryki",
    choice2: "pojechał studiować w Rzymie",
    choice3: "został proboszczem w Radzyniu",
    choice4: "pomagał Biskupowi Sądeckiemu",
    answer: 2,
  },
  {
    question: "Kim był były narzeczony Francesci - Vito? ",
    choice1: "szefem restauracji w Rzymie",
    choice2: "kalabryjskim mafiozą",
    choice3: "włoskim piłkarzem",
    choice4: "aktorem",
    answer: 2,
  },
  {
    question:
      "Jak Czerepach związał się ze swoją późniejszą żoną, panią Lodzią? ",
    choice1: "założył się z wójtem",
    choice2: "miał wypadek i Lodzia mu pomogła",
    choice3: "upili się razem w urzędzie",
    choice4: "spiskowali przeciwko wójtowi",
    answer: 1,
  },
  {
    question: "Ulubione trunki Ławeczki to piwo Tur i wino…",
    choice1: "Mocny Full",
    choice2: "Mózgotrzep",
    choice3: "Mamrot",
    choice4: "Mocny Kozioł",
    answer: 3,
  },
  {
    question:
      "Bywalcy Ławeczki postanowili uwolnić aresztowaną Lucy. W tym celu traktorem wyrwali ścianę aresztu. Kogo uwolnili w rzeczywistości? ",
    choice1: "Wójta",
    choice2: "Wargacza",
    choice3: "Myćkę",
    choice4: "Czerepacha",
    answer: 2,
  },
  {
    question: "Dlaczego Kusy utykał na jedną nogę?",
    choice1: "deptał nią brzydkie obrazy",
    choice2: "miał wypadek w młodości na motorze",
    choice3: "złamał ją goniąc za Lusy",
    choice4: "przygniotła mu ją belka płonącego domu",
    answer: 4,
  },
  {
    question: "Solejukowa obroniła licencjat, z czego? ",
    choice1: "z filozofii",
    choice2: "z socjologii",
    choice3: "z lingwistyki",
    choice4: "z teologii",
    answer: 1,
  },
  {
    question:
      "Księża z plebanii postanowili wysłać małżonków - Michałową ze Stachem na wakacje. Gdzie? ",
    choice1: "do Ciechocinka",
    choice2: "do Grecji",
    choice3: "na Kubę",
    choice4: "do Rzymu",
    answer: 2,
  },
  {
    question:
      "Jaki miała tytuł pierwsza powieść romantyczna Tomasza Witebskiego, polonisty z wilkowyjskiej szkoły? ",
    choice1: "Wilkowyjski Romans",
    choice2: "Po prostu miłość",
    choice3: "Serce nie sługa",
    choice4: "50 twarzy Hadziuka",
    answer: 2,
  },
  {
    question: "W serii 8 Kozioł zaproponował Czerepachowi stanowisko…  ",
    choice1: "szefa kancelarii premiera",
    choice2: "marszała sejmu",
    choice3: "wicepremiera rządu",
    choice4: "ministra rybołustwa",
    answer: 3,
  },
  {
    question: "Dlaczego na początku wójt chce się pozbyć Lusy z Wilkowyj ",
    choice1:
      "Chce zburzyć dworek i sprzedać ziemię developerowi pod budowę osiedla",
    choice2: "Chce urządzić w dworku hotel ze spa",
    choice3: "Chce kupić jej dworek dla swojej córki",
    choice4: "Przez lata kłócił się z jej babcią więc jest uprzedzony",
    answer: 3,
  },
  {
    question: "Kiedy Lusy dowiedziała się jak Kusy ma na imię? ",
    choice1: "gdy przyszedł załatwić sprawę w urzędzie",
    choice2: "babka jej powiedziała",
    choice3: "na ich własnym ślubie",
    choice4: "gdy pojawiła się agentka Monika",
    answer: 3,
  },
  {
    question: "Hodowlą jakich zwierząt zajmowała się Hadziukowa ",
    choice1: "Owiec",
    choice2: "Kóz",
    choice3: "Kur",
    choice4: "Gęsi",
    answer: 2,
  },
  {
    question:
      "Pietrek spod sklepowej ławki ląduje na... scenie disco polo. Jego zespół miał kilka nazw. Która jest nieprawdziwa? ",
    choice1: "Duo Spoko",
    choice2: "Spoko Loco",
    choice3: "Pietrek i Jola",
    choice4: "Pietrek&Jola",
    answer: 2,
  },
  {
    question:
      "Kto zastępuje Michałową na plebanii, gdy ta ma uraz kręgosłupa i musi wziąć urlop zdrowotny? ",
    choice1: "Lusy",
    choice2: "Klaudia",
    choice3: "Solejukowa",
    choice4: "Jola",
    answer: 4,
  },
  {
    question: "Kiedy Lucy zostaje wójtem, na swojego zastępcę wybiera: ",
    choice1: "Dudę",
    choice2: "Więcławską",
    choice3: "Solejukową",
    choice4: "Halinę Kozioł",
    answer: 4,
  },
  {
    question:
      "Ksiądz Kozioł nie zgadzał się na to, żeby Lucy zorganizowała w gminie: ",
    choice1: "lekcje angielskiego w salce parafialnej",
    choice2: "kurs pozyskiwania środków unijnych",
    choice3: "zajęcia gimnastyki Tai-Chi",
    choice4: "lekcje tańca towarzyskiego dla narzeczonych w salce parafialnej",
    answer: 3,
  },
  {
    question: "Jak ma na imię Solejukowa?",
    choice1: "Kazimiera",
    choice2: "Stanisława",
    choice3: "Zofia",
    choice4: "Barbara",
    answer: 1,
  },
  {
    question: "Jak ma na imię Solejuk?",
    choice1: "Wiesław",
    choice2: "Rysiek",
    choice3: "Maciek",
    choice4: "Andrzej",
    answer: 3,
  },
  {
    question:
      "Ile Solejukowie przeznaczyli na remont dachu Kościoła po wygranej w Lotto?",
    choice1: "120 tyś",
    choice2: "110 tyś",
    choice3: "100 tyś",
    choice4: "90 tyś",
    answer: 4,
  },
  {
    question: "Co Jerry złamał sobie po piciu z Hadziukiem?",
    choice1: "Palec",
    choice2: "Rękę",
    choice3: "Nogę",
    choice4: "Żebro",
    answer: 3,
  },
  {
    question: "Gazeta Arkadiusza Czerepacha nosi tytuł:",
    choice1: "Lustro Gminy",
    choice2: "Głos Wilkowyj",
    choice3: "Kurier Wilkowyjski",
    choice4: "Głos Gminy",
    answer: 1,
  },
  {
    question: "Babka zielarka to miejscowa znachorka. Jak miała na imię?",
    choice1: "Zofia",
    choice2: "Celina",
    choice3: "Teresa",
    choice4: "Barbara",
    answer: 1,
  },
  {
    question:
      "Jaki napis przygotował Stasiek dla Violetki, po nieudanym eksperymencie z Solejukową, Hadziukową i Więcławską?",
    choice1: "Obsługuje stara Violetka",
    choice2: "Znów jest dobra obsługa",
    choice3: "Stare cholery odeszły",
    choice4: "Wróciła stara obsługa",
    answer: 4,
  },
  {
    question:
      "Dokończ cytat Japycza o Michałowej: 'Kobieta jak stal. Na co dzień trudna trochę, ale w takiej sytuacji lepsza od...'",
    choice1: "...wojska",
    choice2: "...husarii",
    choice3: "...żołnierza",
    choice4: "...generała",
    answer: 2,
  },
  {
    question:
      "'Diabli wiedzą jaką chemię w nią ładują' - o jakim produkcie spożywczym mówi Solejuk?",
    choice1: "czarna herbata",
    choice2: "woda mineralna",
    choice3: "maślanka",
    choice4: "oranżada",
    answer: 2,
  },
  {
    question: "Dlaczego Marysia zatrudniła się w sklepie Więcławskiej?",
    choice1: "chciałą uciec z miasta",
    choice2: "brakowało jej pieniędzy na wyjazd",
    choice3: "była jej siostrzenicą",
    choice4: "miała uczulenie na cement",
    answer: 4,
  },
  {
    question: "Kto jest ojcem chrzestnym Dorotki, córki Lucy i Kusego?",
    choice1: "Marianek Solejuk",
    choice2: "Tomasz Witebski",
    choice3: "Szymek Solejuk",
    choice4: "Mieczysław Wezół",
    answer: 3,
  },
  {
    question: "Co śpiewali mieszkańcy Wilkowyj aby Lucy nie wyjeżdżała?",
    choice1: "Rotę",
    choice2: "Ave Maryja",
    choice3: "Mazurek Dąbrowskiego",
    choice4: "Zostań tu ze mną",
    answer: 1,
  },
  {
    question: "Kto jako jedyny pojawił się we wszystkich odcinkach?",
    choice1: "Kusy",
    choice2: "Lucy",
    choice3: "Ksiądz",
    choice4: "Klaudia",
    answer: 1,
  },
  {
    question:
      "Kto pomagał Klaudii i Fabianowi pogodzić sie po kolejnym rozstaniu?",
    choice1: "Jagna",
    choice2: "Kinga",
    choice3: "Lucy",
    choice4: "Wioletka",
    answer: 2,
  },
  {
    question: "Za co Ksiądz został aresztowany?",
    choice1: "za prowadzenie pod wpływem alkoholu?",
    choice2: "za zdradzenie tajemnicy spowiedzi",
    choice3: "za pobicie prokuratora",
    choice4: "za danie łapówki Lucy",
    answer: 3,
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
    localStorage.setItem("mostRecentScore", score);

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
