const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore3");

const highScores3 = JSON.parse(localStorage.getItem("highScores3")) || [];

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

  highScores3.push(score);

  highScores3.sort((a, b) => {
    return b.score - a.score;
  });

  highScores3.splice(5);

  localStorage.setItem("highScores3", JSON.stringify(highScores3));
  window.location.assign("index.html");
};
