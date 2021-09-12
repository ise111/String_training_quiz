let quizIndex = 0;
let score = 0;
let damage = 0;
const h1 = document.querySelector('h1');
const intro = document.querySelector('.intro');
const ul = document.querySelector('ul');
const h2 = document.querySelector('h2');
const dammy = document.querySelector('.dammy');
const result = document.querySelector('.result');
const report = document.querySelector('.report');
const btn_inv = document.querySelector('.btn-inv');
const man = document.querySelector('.man');
const quiz = string_quiz;
const quizLength = quiz.length;
let dammyAnswers = [];
for(let i = 1; i < quizLength; i++) {
  dammyAnswers.push(quiz[i].correct);
}
const shuffleDammyAnswers = Array => {
  const ary0 = Array;
  for(let i = ary0.length -1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    [ary0[i], ary0[r]] = [ary0[r], ary0[i]];
  }
return ary0;
}
let dammy_answers = dammyAnswers;
shuffleDammyAnswers(dammy_answers);

const shuffleQuiz = Array => {
  let ary = Array;
  for(let i = ary.length -1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    [ary[i], ary[r]] = [ary[r], ary[i]];
  }
return ary;
}

const finalAnswers = (Array1,Array2) => {
  let ary1 = Array1;
  const dmy_ans = Array2.slice(0, 3);
  ary1 = ary1.concat(dmy_ans);
  return ary1;
}

const shuffleQuizAnswers = Array => {
  let ary2 = Array;
  for(let i = ary2.length -1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    [ary2[i], ary2[r]] = [ary2[r], ary2[i]];
  }
return ary2;
}
shuffleQuiz(quiz);

const $button = document.getElementsByTagName('button');
const setupQuiz = () => {
  h1.textContent = `第${quizIndex + 1}問`;
  document.querySelector('.ques').textContent = quiz[quizIndex].question;
  document.querySelector('.bef').textContent = quiz[quizIndex].before;
  document.querySelector('.res').textContent = quiz[quizIndex].result;
  let answerNomber = 0;
  let incorrectAnswers = dammyAnswers.filter(answer => {
     return answer != quiz[quizIndex].correct;
  });
  let final_answers = shuffleQuizAnswers(finalAnswers(quiz[quizIndex].answers, incorrectAnswers));
  while(answerNomber < $button.length){
    $button[answerNomber].textContent = final_answers[answerNomber];
    answerNomber++;
  }
};

function start() {
  intro.classList.add("stop");
  setupQuiz();
};
intro.addEventListener('click', start);

const clickHandler = (e) => {
  if(quiz[quizIndex].correct === e.target.textContent){
    h1.classList.add("invisible");
    ul.classList.add("invisible");
    h2.classList.add("judgment");
    h2.classList.add("ok");
    h2.textContent = "正解";
    dammy.classList.add("front");
    score++;
  }else{
    h1.classList.add("invisible");
    ul.classList.add("invisible");
    h2.classList.add("judgment");
    h2.classList.add("ng");
    h2.textContent = "残念";
    dammy.classList.add("front");
    damage++
  }
};

let handlerIndex = 0;
while (handlerIndex < $button.length) {
  $button[handlerIndex].addEventListener('click', (e) => {
    clickHandler(e);
  });
  handlerIndex++;
}

function next() {
  h1.classList.remove("invisible");
  ul.classList.remove("invisible");
  h2.classList.remove("judgment");
  h2.classList.remove("ok");
  h2.classList.remove("ng");
  h2.textContent = "";
  dammy.classList.remove("front");
  
  if(quizIndex < quizLength - 1){
    quizIndex++;
    setupQuiz();
  }else{
    quizIndex++;
    h1.classList.add("invisible");
    ul.classList.add("invisible");
    h2.textContent = "";
    result.textContent = 'お疲れ様です！得点は' + score + '/' + quizIndex + 'です！';
    report.classList.add("result-open");
    btn_inv.classList.add("front-last");
    dammy.classList.remove("front");
    man.classList.add("ok-talk");
  }
  
};
dammy.addEventListener('click', next);
