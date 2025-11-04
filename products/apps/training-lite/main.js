const form = document.getElementById("trainingForm");
const logList = document.getElementById("logList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const calendar = document.getElementById("calendar");

let records = JSON.parse(localStorage.getItem("trainingRecords")) || [];
let completedDays = new Set(records.map(r => r.date));

renderLogs();
updateProgress();
renderCalendar();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = new Date().toLocaleDateString();
  const record = {
    goal: form.goal.value,
    exercise: form.exercise.value,
    intensity: form.intensity.value,
    duration: form.duration.value,
    date,
  };

  records.push(record);
  localStorage.setItem("trainingRecords", JSON.stringify(records));
  completedDays.add(date);

  renderLogs();
  updateProgress();
  renderCalendar();
  form.reset();
});

function renderLogs() {
  logList.innerHTML = "";
  records.slice(-10).reverse().forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.date}｜${r.goal}｜${r.exercise}｜${r.intensity}｜${r.duration}`;
    logList.appendChild(li);
  });
}

function updateProgress() {
  const goal = 20; // 仮の月目標回数
  const progress = Math.min((records.length / goal) * 100, 100);
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `達成率：${Math.floor(progress)}%`;
}

function renderCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = "";
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${month + 1}/${i}/${year}`;
    const div = document.createElement("div");
    div.textContent = i;
    if (completedDays.has(dateStr)) div.classList.add("active");
    calendar.appendChild(div);
  }
}
