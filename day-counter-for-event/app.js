const eventName = document.querySelector('#eventName')
const eventDate = document.querySelector('#eventDate')
const btnAdd = document.querySelector('#btnAdd')
const eventsContainer = document.querySelector('#events-container')

const json = load()
let array = [] 
let events = []

try {
  array = JSON.parse(json)
} catch(error) {}

events = array? [...array] : []
renderEvents()

document
  .querySelector('.form')
  .addEventListener("submit", e => {
    e.preventDefault()
    addEvent()
  })

function addEvent() {
  if (eventName.value === "" || eventDate.value === "") {
    return
  }

  if (dateDiff(eventDate.value) < 0) {
    return
  }

  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value
  }

  events.unshift(newEvent)
  saveData(JSON.stringify(events))

  renderEvents()
}

function dateDiff(d) {
  const targetDate = new Date(d)
  const currentDate = new Date()
  const difference = targetDate.getTime() - currentDate.getTime()
  const days = Math.ceil(difference / (1000 * 3600 * 24))

  return days
}

function renderEvents() {
  const eventsHTML = events.map(e => {
    return `
      <div class="event">

        <div class="days">
          <span class="days-number">
            ${dateDiff(e.date)}
          </span>
          <span class="days-text">
            Days
          </span>
        </div>

        <div class="event-name">
          ${e.name}
        </div>

        <div class="event-date">
          ${e.date}
        </div>

        <div class="actions">
          <button class="bDelete" data-id="${e.id}">
            Delete
          </button> 
        </div>

      </div>
    `
  })

  eventsContainer.innerHTML = eventsHTML.join("")

  document.querySelectorAll('.bDelete').forEach(button => {
    button.addEventListener('click', () => {
      const eventId = button.getAttribute('data-id')
      events = events.filter(event => event.id !== eventId)
      renderEvents()
      saveData(JSON.stringify(events))
    })
  })

}

function saveData(data) {
  localStorage.setItem('items', data)
}

function load() {
  return localStorage.getItem('items')
}

