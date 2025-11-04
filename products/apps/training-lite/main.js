document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('trainingForm');
  const logList = document.getElementById('logList');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const calendar = document.getElementById('calendar');

  let records = JSON.parse(localStorage.getItem('trainingRecords')) || [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    const exercise = document.getElementById('exercise').value;
    const intensity = document.getElementById('intensity').value;
    const duration = document.getElementById('duration').value;
    const date = new Date().toISOString().split('T')[0];

    const record = { date, goal, exercise, intensity, duration };
    records.push(record);
    localStorage.setItem('trainingRecords', JSON.stringify(records));
    form.reset();
    renderLogs();
    updateProgress();
  });

  function renderLogs() {
    logList.innerHTML = '';
    records.forEach((r) => {
      const li = document.createElement('li');
      li.textContent = `${r.date}｜${r.goal}｜${r.exercise}｜${r.intensity}｜${r.duration}`;
      logList.appendChild(li);
    });
  }

  function updateProgress() {
    const total = records.length;
    const percent = total > 0 ? Math.min(100, total * 10) : 0;
    progressBar.style.width = percent + '%';
    progressText.textContent = `達成率：${percent}%`;
  }

  function renderCalendar() {
    const days = Array.from(new Set(records.map(r => r.date)));
    calendar.innerHTML = days.map(d => `<div class="day">${d}</div>`).join('');
  }

  renderLogs();
  updateProgress();
  renderCalendar();
});
