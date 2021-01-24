const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore5");

const highScores5 = JSON.parse(localStorage.getItem("highScores5")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Gratulacje! Uzyskano ${mostRecentScore} punktów`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores5.push(score);

  highScores5.sort((a, b) => {
    return b.score - a.score;
  });

  highScores5.splice(5);

  localStorage.setItem("highScores5", JSON.stringify(highScores5));
  window.location.assign("index.html");
};
