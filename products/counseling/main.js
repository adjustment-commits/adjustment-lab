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
        <button id="goToLite" class="main-btn">▶ 推奨教材へ進む</button>
        <hr>
        <p style="color:#666; font-size:0.9rem;">他の教材を選ぶ</p>
        <div class="icon-links">
          <img src="../lite/icons/icon-A.png" alt="A" class="jump" data-link="../lite/A.html">
          <img src="../lite/icons/icon-B.png" alt="B" class="jump" data-link="../lite/B.html">
          <img src="../lite/icons/icon-C.png" alt="C" class="jump" data-link="../lite/C.html">
          <img src="../lite/icons/icon-D.png" alt="D" class="jump" data-link="../lite/D.html">
          <img src="../lite/icons/icon-E.png" alt="E" class="jump" data-link="../lite/E.html">
        </div>
      `;

      // 推奨教材へ
      document.getElementById('goToLite').onclick = () => {
        window.location.href = result.link;
      };

      // 自由選択教材へ
      document.querySelectorAll('.jump').forEach(img => {
        img.addEventListener('click', () => {
          window.location.href = img.dataset.link;
        });
      });
    }
  });
});

// 推奨ロジック
function analyzeAnswers(ans) {
  const joined = ans.join(" ");
  let text = "体を整える基本から始めましょう（A）";
  let link = "../lite/A.html";

  // ✅ 最優先：対面セッション
  if (joined.includes("相談") || joined.includes("セッション")) {
    return {
      text: "あなたに最適なサポートは<br>『整 - adjustment』の<br>対面セッションです。",
      link: "/adjustment/index.html"
    };
  }

  if (joined.includes("出力") || joined.includes("爆発力")) {
    text = "出力連鎖を整えるなら<br>『投手のための“力の順番”』（C）";
    link = "../lite/C.html";
  } 
  else if (joined.includes("姿勢") || joined.includes("安定") || joined.includes("再現性")) {
    text = "姿勢と再現性を整えるなら<br>『野球選手に共通する“整う姿勢”』（B）";
    link = "../lite/B.html";
  } 
  else if (joined.includes("リズム") || joined.includes("しなやか")) {
    text = "ヒップインで動きのリズムを掴む<br>『動きを感じるヒップイン入門』（D）";
    link = "../lite/D.html";
  } 
  else if (joined.includes("呼吸") || joined.includes("疲労")) {
    text = "再現性と回復を支える<br>『呼吸の整え方』（E）";
    link = "../lite/E.html";
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
