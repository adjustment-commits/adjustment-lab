const cards = document.querySelectorAll('.card');
let currentStep = 1;
let answers = [];

document.querySelectorAll('.option').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    answers.push(value);

    // 次のカードを表示
    cards.forEach(c => c.classList.remove('active'));
    currentStep++;
    if (currentStep <= cards.length) {
      cards[currentStep - 1].classList.add('active');
    }

    // 最終結果処理
    if (currentStep === 6) {
      const result = analyzeAnswers(answers);
      document.getElementById('resultText').textContent = result.text;
      document.getElementById('goToLite').onclick = () => {
        window.location.href = result.link;
      };
    }
  });
});

function analyzeAnswers(ans) {
  let text = "体を整える基本から始めましょう（#01）";
  let link = "/adjustment-lab/products/lite/01.html";

  const joined = ans.join(" ");

  if (joined.includes("出力") || joined.includes("爆発力")) {
    text = "出力連鎖を整えるなら『投手のための“力の順番”』（#03）";
    link = "/adjustment-lab/products/lite/03.html";
  } 
  else if (joined.includes("姿勢") || joined.includes("安定") || joined.includes("再現性")) {
    text = "姿勢と再現性を整えるなら『野球選手に共通する“整う姿勢”』（#02）";
    link = "/adjustment-lab/products/lite/02.html";
  } 
  else if (joined.includes("リズム") || joined.includes("しなやか")) {
    text = "ヒップインで動きのリズムを掴む『動きを感じるヒップイン入門』（#04）";
    link = "/adjustment-lab/products/lite/04.html";
  } 
  else if (joined.includes("呼吸") || joined.includes("疲労")) {
    text = "再現性と回復を支える『呼吸の整え方』（#05）";
    link = "/adjustment-lab/products/lite/05.html";
  }

  return { text, link };
}

// リスタート機能
document.getElementById('restart').addEventListener('click', () => {
  currentStep = 1;
  answers = [];
  cards.forEach(c => c.classList.remove('active'));
  cards[0].classList.add('active');
});
