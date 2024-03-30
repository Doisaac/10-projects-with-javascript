const boardContainer = document.querySelector('#board')
const playerTurn = document.querySelector('#player')
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

/*
 * USER = 0
 * PC = 1
*/
let turn = 0;


startGame()

function startGame() {
  renderBoard()
  turn = Math.random() <= 0.5 ? 0 : 1
  renderCurrentPlayer()

  if (turn === 0) {
    playerPlays()
  } else {
    PCPlays()
  }
}

function renderBoard() {
  const html = board.map(row => {
    const cells = row.map(cell => {
      return `<button class="cell">${cell}</button>`
    })
    return `<div class="row">${cells.join("")}</div>`
  })

  boardContainer.innerHTML = html.join("")
}

function renderCurrentPlayer() {
  playerTurn.textContent = `${turn === 0 ? 'Player turn' : 'PC turn'}`
}

function playerPlays() {
  const cells = document.querySelectorAll('.cell')
    .forEach((cell, index) => {

      const column = index % 3
      const row = parseInt(index / 3)

      if (board[row][column] === "") {
        cell.addEventListener('click', e => {
          board[row][column] = "0"
          cell.textContent = board[row][column]
          turn = 1

          const won = checkIfWinner()
          if (won === 'none') {
            PCPlays()
            return
          }
          if (won === 'draw') {
            renderDraw()
            cell.removeEventListener("click", this)
            return
          }
        })
      }
    })
}

function PCPlays() {
  renderCurrentPlayer()

  setTimeout(() => {
    let played = false
    const options = checkIfCanWin()

    if (options.length > 0) {
      const bestOption = options[0]
      for (let i = 0; i < bestOption.length; i++) {
        if (bestOption[i].value === 0) {
          const posi = bestOption[i].i
          const posj = bestOption[i].j
          board[posi][posj] = "X"
          played = true
          break
        }
      }
    } else {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "" && !played) {
            board[i][j] = "X"
            played = true
          }
        }
      }
    }
    turn = 0;
    renderBoard()
    renderCurrentPlayer()
    
    const won = checkIfWinner()
    
    if (won === 'none') {
      playerPlays()
      return
    }
    if (won === 'draw') {
      renderDraw()
      return
    }

  }, 1500)

}

function renderDraw() {
  playerTurn.textContent = "Draw"
}

function checkIfCanWin() {
  const arr = JSON.parse(JSON.stringify(board))

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === "X") {
        arr[i][j] = { value: 1, i: i, j: j };
      }
      if (arr[i][j] === "") {
        arr[i][j] = { value: 0, i: i, j: j };
      }
      if (arr[i][j] === "O") {
        arr[i][j] = { value: -2, i: i, j: j };
      }
    }
  }

  const pos1 = arr[0][0]
  const pos2 = arr[0][1]
  const pos3 = arr[0][2]

  const pos4 = arr[1][0]
  const pos5 = arr[1][1]
  const pos6 = arr[1][2]

  const pos7 = arr[2][0]
  const pos8 = arr[2][1]
  const pos9 = arr[2][2]


  // Possible horizontal victory options
  const vic1 = [pos1, pos2, pos3]
  const vic2 = [pos4, pos5, pos6]
  const vic3 = [pos7, pos8, pos9]

  // Possible vertical victory options
  const vic4 = [pos1, pos4, pos7]
  const vic5 = [pos2, pos5, pos8]
  const vic6 = [pos3, pos6, pos9]

  // Possible diagonal victory options
  const vic7 = [pos1, pos5, pos9]
  const vic8 = [pos3, pos5, pos7]

  const answer = [vic1, vic2, vic3, vic4, vic5, vic6, vic7, vic8]
    .filter(line => {
      return (
        line[0].value + line[1].value + line[2].value === 2 ||
        line[0].value + line[1].value + line[2].value === -4
      )
    })

  console.log(answer)
  return answer;
}

function checkIfWinner() {
  const pos1 = board[0][0]
  const pos2 = board[0][1]
  const pos3 = board[0][2]

  const pos4 = board[1][0]
  const pos5 = board[1][1]
  const pos6 = board[1][2]

  const pos7 = board[2][0]
  const pos8 = board[2][1]
  const pos9 = board[2][2]


  // Possible horizontal victory options
  const vic1 = [pos1, pos2, pos3]
  const vic2 = [pos4, pos5, pos6]
  const vic3 = [pos7, pos8, pos9]

  // Possible vertical victory options
  const vic4 = [pos1, pos4, pos7]
  const vic5 = [pos2, pos5, pos8]
  const vic6 = [pos3, pos6, pos9]

  // Possible diagonal victory options
  const vic7 = [pos1, pos5, pos9]
  const vic8 = [pos3, pos5, pos7]

  const answer = [vic1, vic2, vic3, vic4, vic5, vic6, vic7, vic8]
    .filter(line => {
      return (
        line[0] + line[1] + line[2] === 'XXX' ||
        line[0] + line[1] + line[2] === '000'
      )
    })

  if (answer.length > 0) {
    if (answer[0][0] == 'X') {
      playerTurn.textContent = 'PC WINS'
      return "pcwon"
    } else {
      playerTurn.textContent = 'USER WINS'
      return "pcwon"
    }
  } else {
    let draw = true;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          draw = false
          break
        }
      }
    }
    
    return draw? 'draw' : 'none';
  }
}