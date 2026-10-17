// script.js — 測驗渲染、計分與結果邏輯
// 計分演算法沿用原版：8選4(1分/項) → 4選2(2分/項) → 2選1(2分)

let currentSet = 0;
let currentStep = 0;
let previousSelection = [];
let scores = {};
let userName = "";

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatDateTime(d) {
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const stepPrompt = set => [
  `(${set.title}) 請從下列 8 項中選出最符合你的 4 項特質：`,
  `(${set.title}) 請從剛剛選的 4 項中選出你最重視的 2 項：`,
  `(${set.title}) 請從剛剛的 2 項中選出最能代表你的那一項：`
];
const stepMax = [4, 2, 1];
const stepType = ["multi", "multi", "single"];
const stepPoints = [1, 2, 2];

function updateProgress() {
  const totalSteps = sets.length * 3;
  const doneSteps = currentSet * 3 + currentStep;
  const pct = Math.round((doneSteps / totalSteps) * 100);
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("progress-label").textContent =
    `${sets[currentSet].title} · 第 ${currentStep + 1} / 3 步驟（整體進度 ${pct}%）`;
}

function renderStep() {
  updateProgress();

  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  const set = sets[currentSet];
  const prompts = stepPrompt(set);

  const prompt = document.createElement("div");
  prompt.className = "question";
  prompt.innerText = prompts[currentStep];
  quiz.appendChild(prompt);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";
  const options = currentStep === 0 ? set.options : previousSelection;

  options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.innerText = opt.label;
    btn.onclick = () => {
      if (stepType[currentStep] === "multi") {
        btn.classList.toggle("selected");
        const selected = optionsDiv.querySelectorAll(".option.selected");
        if (selected.length > stepMax[currentStep]) {
          btn.classList.remove("selected");
        }
      } else {
        optionsDiv.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      }
    };
    optionsDiv.appendChild(btn);
  });
  quiz.appendChild(optionsDiv);

  const actions = document.createElement("div");
  actions.className = "actions";
  const nextBtn = document.createElement("button");
  nextBtn.innerText = currentSet === sets.length - 1 && currentStep === 2 ? "看結果 🔮" : "下一步";
  nextBtn.onclick = () => {
    const selected = optionsDiv.querySelectorAll(".option.selected");
    if (selected.length !== stepMax[currentStep]) {
      alert(`請選擇 ${stepMax[currentStep]} 項`);
      return;
    }
    const selections = Array.from(selected).map(el => el.innerText);
    const resultOptions = options.filter(o => selections.includes(o.label));
    resultOptions.forEach(opt => {
      scores[opt.trait] = (scores[opt.trait] || 0) + stepPoints[currentStep];
    });
    previousSelection = resultOptions;

    if (currentStep < 2) {
      currentStep++;
    } else {
      currentStep = 0;
      currentSet++;
    }

    if (currentSet < sets.length) {
      renderStep();
    } else {
      showResult();
    }
  };
  actions.appendChild(nextBtn);
  quiz.appendChild(actions);
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("progress-wrap").classList.add("hidden");
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  const completedAt = new Date();
  const sum = traits => traits.reduce((acc, t) => acc + (scores[t] || 0), 0);

  const extro = sum(["果斷", "掌控", "理想", "人際"]);
  const intro = sum(["分析", "事務", "創意", "感覺"]);
  const rational = sum(["果斷", "分析", "掌控", "事務"]);
  const emotional = sum(["創意", "感覺", "理想", "人際"]);
  const action = sum(["掌控", "事務", "感覺", "人際"]);
  const thinking = sum(["果斷", "分析", "創意", "理想"]);

  const logic = sum(["果斷", "分析"]);
  const pioneer = sum(["創意", "理想"]);
  const organizer = sum(["掌控", "事務"]);
  const emotion = sum(["感覺", "人際"]);

  resultDiv.innerHTML = `
    <div class="result-header">
      <div class="result-meta"><strong>${escapeHtml(userName)}</strong> 的測驗結果 ・ ${formatDateTime(completedAt)}</div>
    </div>

    <div class="section-title">壹、八種風格類型分析一覽表</div>
    <table>
      <tr><th>果斷</th><th>分析</th><th>創意</th><th>理想</th></tr>
      <tr>
        <td>${scores["果斷"] || 0}</td><td>${scores["分析"] || 0}</td>
        <td>${scores["創意"] || 0}</td><td>${scores["理想"] || 0}</td>
      </tr>
      <tr><th>掌控</th><th>事務</th><th>感覺</th><th>人際</th></tr>
      <tr>
        <td>${scores["掌控"] || 0}</td><td>${scores["事務"] || 0}</td>
        <td>${scores["感覺"] || 0}</td><td>${scores["人際"] || 0}</td>
      </tr>
    </table>

    <div class="section-title">貳、三種風格特質分析一覽表</div>
    <table>
      <tr><th>外向 vs 內向</th><th>理性 vs 感性</th><th>行動 vs 思考</th></tr>
      <tr>
        <td>${extro} vs ${intro}</td>
        <td>${rational} vs ${emotional}</td>
        <td>${action} vs ${thinking}</td>
      </tr>
    </table>

    <div class="section-title">參、四種風格類型分析一覽表</div>
    <table>
      <tr><th>理智</th><th>開創</th><th>組織</th><th>情感</th></tr>
      <tr>
        <td>${logic}</td><td>${pioneer}</td><td>${organizer}</td><td>${emotion}</td>
      </tr>
    </table>

    <div class="share-row">
      <button id="btn-share">🔗 分享結果</button>
      <button id="btn-retake" class="secondary">🔄 重新測驗</button>
    </div>
  `;

  bindResultActions();
}

function bindResultActions() {
  const shareBtn = document.getElementById("btn-share");
  const retakeBtn = document.getElementById("btn-retake");

  shareBtn.onclick = async () => {
    const shareData = {
      title: "識人魔法心理測驗",
      text: "我剛完成了識人魔法心理測驗，一起來測測看！",
      url: window.location.href.split("?")[0]
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // 使用者取消分享，忽略
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        showToast("連結已複製！");
      } catch (e) {
        showToast("複製失敗，請手動複製網址");
      }
    }
  };

  retakeBtn.onclick = resetQuiz;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function resetQuiz() {
  currentSet = 0;
  currentStep = 0;
  previousSelection = [];
  scores = {};
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("progress-wrap").classList.remove("hidden");
  renderStep();
}

function startQuiz() {
  const val = document.getElementById("name-input").value.trim();
  if (!val) {
    alert("請輸入姓名才能開始測驗");
    return;
  }
  userName = val;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("progress-wrap").classList.remove("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  renderStep();
}

document.getElementById("start-btn").onclick = startQuiz;
document.getElementById("name-input").addEventListener("keydown", e => {
  if (e.key === "Enter") startQuiz();
});
