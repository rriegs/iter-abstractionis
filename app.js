const tasks = [
  { text: "Your sister is cold; go get some wood", prompt: true },
  { text: "Approach the forest", duration: 3000 },
  { text: "Gather fallen limbs", duration: 3000 },
  { text: "Return home", duration: 3000 }
];

let currentTask = 0;

function showPrompt(taskIndex) {
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = '';

  const text = document.createElement('p');
  text.textContent = tasks[taskIndex].text;
  taskContainer.appendChild(text);

  const button = document.createElement('button');
  button.textContent = 'OK';
  taskContainer.appendChild(button);

  button.addEventListener('click', () => {
    currentTask = taskIndex + 1;
    startTask(currentTask);
  });
}

function startTask(taskIndex) {
  const task = tasks[taskIndex];
  if (!task) {
    showCompletion();
    return;
  }

  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = '';

  const text = document.createElement('p');
  text.textContent = task.text;
  taskContainer.appendChild(text);

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const fill = document.createElement('div');
  fill.className = 'progress-fill';
  progressBar.appendChild(fill);
  taskContainer.appendChild(progressBar);

  const duration = task.duration || 3000;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const percent = Math.min(100, (elapsed / duration) * 100);
    fill.style.width = percent + '%';
    if (percent >= 100) {
      clearInterval(interval);
      currentTask += 1;
      if (tasks[currentTask] && tasks[currentTask].prompt) {
        showPrompt(currentTask);
      } else {
        startTask(currentTask);
      }
    }
  }, 100);
}

function showCompletion() {
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = '';
  const text = document.createElement('p');
  text.textContent = 'Your father thanks you for helping.';
  taskContainer.appendChild(text);
}

window.addEventListener('DOMContentLoaded', () => {
  if (tasks[0].prompt) {
    showPrompt(0);
  } else {
    startTask(0);
  }
});
