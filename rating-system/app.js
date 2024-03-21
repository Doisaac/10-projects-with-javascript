const ratingContainer = document.querySelector('.rating')

let currentValue = 0
const limitValue = 5

const html = Array.from(Array(limitValue))
  .map((item, index) => {
    return `
      <div class="item item-${index}" data-pos="${index}">
      </div>
    `
  })

ratingContainer.innerHTML = html.join("")

const items = document.querySelectorAll('.item')
  .forEach(item => {

    item.addEventListener('mouseover', () => {
      const pos = item.getAttribute('data-pos')

      if (currentValue == parseInt(pos) + 1) {
        return
      }

      document.querySelectorAll('.item').forEach(it => {
        if (it.classList.contains('item-full')) {
          it.classList.remove('item-full')
        }
      })

      for (let i = 0; i <= pos; i++) {
        const square = document.querySelector(`.item-${i}`)

        if (!square.classList.contains('item-full')) {
          square.classList.add('item-full')
        }
      }

      currentValue = parseInt(pos) + 1
    })

    item.addEventListener('click', () => {
      let itemPosition = item.getAttribute('data-pos')
      console.log(parseInt(itemPosition) + 1)
    })
  })



