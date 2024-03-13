const btnAddTask = document.getElementById('submit')
const taskInput = document.getElementById('taskText')
const form = document.getElementById('form')
const taskName = document.querySelector('#taskName')
const tasksContainer = document.querySelector('.app__tasks')

const tasks = []
let time = 0
let timer = null
let timerBreak = null
let current = null

renderTime()
renderTasks()

form.addEventListener('submit', e => {
  e.preventDefault()

  if (taskInput.value !== '') {
    createTask(taskInput.value)
    taskInput.value = ''
    renderTasks()
  }
})

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false
  }
  tasks.unshift(newTask)
}

// Inserts a task container for each task in the array
function renderTasks() {
  let html = tasks.map(task => {
    return `
      <div class="task">
      <div class="title">${task.title}</div>
      <div class="completed">
      ${task.completed
        ? `<span class="done">Done</span>`
        : `<button class="startButton" data-id="${task.id}">Start</button>`
      }
      </div>
      </div>
    `
  })

  // Inserts the tasks
  tasksContainer.innerHTML = html.join('')

  const startButtons = document.querySelectorAll('.startButton')

  startButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!timer) {
        startButtonHandler(button.getAttribute('data-id'))
        button.textContent = "In progress..."
      }
    })
  })
}

function startButtonHandler(id) {
  time = 25 * 60
  current = id

  const taskIndex = tasks.findIndex(task => task.id === id)
  taskName.textContent = tasks[taskIndex].title

  renderTime()
  timer = setInterval(() => {
    timeHandler(id)
  }, 1000)
}

function timeHandler(id = null) {
  time--;
  renderTime()

  if (time === 0) {
    clearInterval(timer)
    markCompleted(id)
    timer = null
    renderTasks()
    startBreak();
  }
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex(task => task.id === id)
  tasks[taskIndex].completed = true
}

function startBreak() {
  time = 5 * 60
  taskName.textContent = 'Break'
  renderTime()
  timerBreak = setInterval(timerBreakHandler, 1000)
}

function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null
    document.querySelector("#taskName").textContent = "";
    renderTime();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}`;
}


