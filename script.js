let currentPlayer = {
  id: 'player1',
  symbol: null
};

const chooseSides = () => {
  const playerSymbol = prompt(`Choose your symbol (type 'x' or 'o'): `);
  if (playerSymbol === 'x') {
    currentPlayer.symbol = 'x';
  } else if (playerSymbol === 'o') {
    currentPlayer.symbol = 'o';
  } else {
    alert('you did not choose a correct side, please try again');
    chooseSides();
  }

  $('.turn').text(`${currentPlayer.id} / ${currentPlayer.symbol}`);
  checkForPlayerClick();
};

const initBoard = () => {
  const gridSize = prompt('enter the size wanted for the board');

  for (let j = 0; j < gridSize; j++) {
    $('.board').append(`<div class="row" id="row${j}"></div>`);
    for (let i = 0; i < gridSize; i++) {
      $(`#row${j}`).append(`<div class="cell cell-${i}">
      
      </div>`);
    }
  }

  chooseSides();
};

const changePlayers = () => {
  currentPlayer.id === 'player1'
    ? (currentPlayer.id = 'player2')
    : (currentPlayer.id = 'player1');

  currentPlayer.symbol === 'x'
    ? (currentPlayer.symbol = 'o')
    : (currentPlayer.symbol = 'x');

  $('.turn').text(`${currentPlayer.id} / ${currentPlayer.symbol}`);
};

const checkAllCellsEqualInLine = array => {
  return array.every(cell => {
    if ($(cell).hasClass('marked-x') || $(cell).hasClass('marked-o')) {
      return cell.classList[3] === array[0].classList[3];
    }
  });
};

const checkForWin = () => {
  const rows = $('.row');
  let won = false;
  const diagonalLtrArray = [];
  const diagonalRtlArray = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const colArray = $(`.cell-${i}`).toArray();
    diagonalLtrArray.push($(`#row${i} .cell-${i}`)[0]);
    diagonalRtlArray.push($(`#row${i} .cell-${rows.length - i - 1}`)[0]);

    const cellsInColEqual = checkAllCellsEqualInLine(colArray);

    if (cellsInColEqual) {
      won = true;
      break;
    }

    const rowArray = Array.from(row.childNodes);
    const cellsInRowEqual = checkAllCellsEqualInLine(rowArray);

    if (cellsInRowEqual) {
      won = true;
      break;
    }
  }

  const diagonalRtlArrayEqual = checkAllCellsEqualInLine(diagonalRtlArray);

  if (diagonalRtlArrayEqual) {
    won = true;
  } else {
    const diagonalLtrArrayEqual = checkAllCellsEqualInLine(diagonalLtrArray);

    if (diagonalLtrArrayEqual) {
      won = true;
    }
  }

  if (won) {
    alert(currentPlayer.id + ' won!');

    $('.board').empty();
    currentPlayer.id = 'player1';
    currentPlayer.symbol = null;
    initBoard();
    return;
  }

  changePlayers();
};

const checkForPlayerClick = () => {
  $('.cell').click(e => {
    if ($(e.currentTarget).hasClass('marked')) {
      return;
    }

    $(e.currentTarget).addClass('marked');

    if (currentPlayer.symbol === 'x') {
      $(e.currentTarget).addClass('marked-x');
      $(e.currentTarget).append(`<i class="${'fas fa-times'}"></i>`);
    } else {
      $(e.currentTarget).addClass('marked-o');
      $(e.currentTarget).append(`<i class="${'far fa-circle'}"></i>`);
    }

    checkForWin();
  });
};

const init = () => {
  initBoard();
};

window.addEventListener('DOMContentLoaded', event => {
  init();
});
