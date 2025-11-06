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
      const resultArea = document.getElementById('resultText');
      resultArea.innerHTML = `
        <p>${result.text}</p>
        <button id="goToLite">▶ 推奨教材へ進む</button>
        <hr>
        <p style="color:#666; font-size:0.9rem;">他の教材を選ぶ</p>
        <div class="other-links">
          <button class="jump" data-link="../lite/A.html">A｜体を整える基本</button>
          <button class="jump" data-link="../lite/B.html">B｜姿勢と再現性</button>
          <button class="jump" data-link="../lite/C.html">C｜出力連鎖と力の順番</button>
          <button class="jump" data-link="../lite/D.html">D｜ヒップインとリズム</button>
          <button class="jump" data-link="../lite/E.html">E｜呼吸と回復</button>
        </div>
      `;

      // 推奨教材へ
      document.getElementById('goToLite').onclick = () => {
        window.location.href = result.link;
      };

      // 自由選択教材へ
      document.querySelectorAll('.jump').forEach(b => {
        b.addEventListener('click', () => {
          window.location.href = b.dataset.link;
        });
      });
    }
  });
});

// 推奨ロジック
function analyzeAnswers(ans) {
  let text = "体を整える基本から始めましょう（A）";
  let link = "../lite/A.html";

  const joined = ans.join(" ");

  if (joined.includes("出力") || joined.includes("爆発力")) {
    text = "出力連鎖を整えるなら『投手のための“力の順番”』（C）";
    link = "../lite/C.html";
  } 
  else if (joined.includes("姿勢") || joined.includes("安定") || joined.includes("再現性")) {
    text = "姿勢と再現性を整えるなら『野球選手に共通する“整う姿勢”』（B）";
    link = "../lite/B.html";
  } 
  else if (joined.includes("リズム") || joined.includes("しなやか")) {
    text = "ヒップインで動きのリズムを掴む『動きを感じるヒップイン入門』（D）";
    link = "../lite/D.html";
  } 
  else if (joined.includes("呼吸") || joined.includes("疲労")) {
    text = "再現性と回復を支える『呼吸の整え方』（E）";
    link = "../lite/E.html";
  }
  else if (joined.includes("相談")) {
  text = "トレーニングを直接体験するなら「整 - adjustment」へ。";
  link = "/adjustment/index.html";
　}

  return { text, link };
}

// リスタート
document.getElementById('restart').addEventListener('click', () => {
  currentStep = 1;
  answers = [];
  cards.forEach(c => c.classList.remove('active'));
  cards[0].classList.add('active');
});
