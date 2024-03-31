const tagsContainer = document.createElement("div");
const inputTagContainer = document.querySelector("#input-tag");
const inputTag = document.createElement("span");

let tags = [];

inputTag.arialRoleDescription = 'textbox'
inputTag.contentEditable = 'true'
inputTag.classList.add('input')
inputTag.focus()

inputTagContainer.classList.add('input-tag-container')
tagsContainer.classList.add("tag-container")

inputTagContainer.appendChild(tagsContainer)
tagsContainer.appendChild(inputTag)

inputTagContainer.addEventListener("click", e => {
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus()
  }
});

inputTag.addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    e.key.textContent !== ''
  ) {
    e.preventDefault()

    if (!tagExist(inputTag.textContent)) {
      tags.push(inputTag.textContent)
      inputTag.textContent = ''
      renderTags()
    }
  } else if (
    e.key === 'Backspace' &&
    inputTag.textContent == '' &&
    tags.length > 0
  ) {
    tags.pop()
    renderTags()
  }
})

function renderTags() {
  tagsContainer.innerHTML = ''

  const html = tags.map(tag => {
    const tagElement = document.createElement('div')
    const tagButton = document.createElement('button')

    tagElement.classList.add('tag-item')
    tagButton.textContent = 'X'

    tagButton.addEventListener('click', (e) => {
      // Delete tag
      removeTag(tag)
    })

    tagElement.appendChild(document.createTextNode(tag))
    tagElement.appendChild(tagButton)
    return tagElement
  })

  html.forEach(element => {
    tagsContainer.appendChild(element)
  })

  tagsContainer.appendChild(inputTag)
  inputTag.focus()
}

function tagExist(value) { return tags.includes(value) }


function removeTag(value) {
  tags = tags.filter(tag => tag !== value)
  renderTags()
}




