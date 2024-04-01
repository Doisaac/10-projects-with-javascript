const inputContainer = document.createElement('div')
const input = document.createElement('input')
const commentsContainer = document.querySelector('#comments-container')

const comments = []

input.classList.add('input')

input.addEventListener('keydown', (e) => {
  handleEnter(e, null)
})

inputContainer.appendChild(input)
commentsContainer.appendChild(inputContainer)

function handleEnter(e, currentComment) {
  if (e.key === 'Enter' && e.target.value !== '') {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: []
    }

    if (currentComment === null) {
      comments.unshift(newComment)
    } else {
      currentComment.responses.unshift(newComment)
    }

    console.log(comments)

    e.target.value = ''
    commentsContainer.innerHTML = ''
    commentsContainer.appendChild(inputContainer)

    renderComments(comments, commentsContainer)
  }
}

function renderComments(arr, parentContainer) {
  arr.forEach(comment => {
    const commentContainer = document.createElement('div')
    commentContainer.classList.add('comment-container')

    const responsesContainer = document.createElement('div')
    responsesContainer.classList.add('responses-container')

    const replyButton = document.createElement('button')
    const likeButton = document.createElement('button')

    const textContainer = document.createElement('div')
    textContainer.textContent = comment.text

    const actionsContainer = document.createElement('div')

    replyButton.textContent = 'Reply'
    likeButton.textContent = `
      ${comment.likes > 0 ?
        `${comment.likes} likes` :
        `like`
      }
    `

    replyButton.addEventListener('click', (e) => { 
      const newInput = inputContainer.cloneNode(true)
      newInput.value = ''
      newInput.focus()
      newInput.addEventListener('keydown', (e) => {
        handleEnter(e,comment)
      })
      commentContainer.insertBefore(newInput, responsesContainer)
    })

    likeButton.addEventListener('click', () => { 
      comment.likes++
      likeButton.textContent = `
      ${comment.likes > 0 ?
        `${comment.likes} likes` :
        `like`
      }
    `
    })

    // Append
    commentContainer.appendChild(textContainer)
    commentContainer.appendChild(actionsContainer)
    actionsContainer.appendChild(replyButton)
    actionsContainer.appendChild(likeButton)

    commentContainer.appendChild(responsesContainer)

    if (comment.responses.length > 0) {
      renderComments(comment.responses, responsesContainer)
    }

    parentContainer.appendChild(commentContainer)
  })
}