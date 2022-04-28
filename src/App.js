import './App.css';
import Cell from './Cell';
import React, { useReducer, useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export const PLAYERS = {
  X: 'X',
  O: 'O'
}

function reducer(cells, action) {
  if (action.type === "OWN") {
    return cells.map(cell => {
      if (cell.id === action.payload.id && !cell.owned) {
        return { id: action.payload.id, owned: true, owner: action.payload.player }
      }
      return cell;
    })
  }
}
function App() {
  const [cells, dispatch] = useReducer(reducer, [
    { id: 1, owned: false, owner: null },
    { id: 2, owned: false, owner: null },
    { id: 3, owned: false, owner: null },
    { id: 4, owned: false, owner: null },
    { id: 5, owned: false, owner: null },
    { id: 6, owned: false, owner: null },
    { id: 7, owned: false, owner: null },
    { id: 8, owned: false, owner: null },
    { id: 9, owned: false, owner: null },
  ])

  const checkWinningState = () => {
    if (
      (cells[0].owner !== null && cells[0].owner === cells[1].owner && cells[0].owner === cells[2].owner) ||
      (cells[3].owner !== null && cells[3].owner === cells[4].owner && cells[3].owner === cells[5].owner) ||
      (cells[6].owner !== null && cells[6].owner === cells[7].owner && cells[6].owner === cells[8].owner) ||
      // columns
      (cells[0].owner !== null && cells[0].owner === cells[3].owner && cells[0].owner === cells[6].owner) ||
      (cells[1].owner !== null && cells[1].owner === cells[4].owner && cells[1].owner === cells[7].owner) ||
      (cells[2].owner !== null && cells[2].owner === cells[5].owner && cells[2].owner === cells[8].owner) ||
      // Diameter
      (cells[0].owner !== null && cells[0].owner === cells[4].owner && cells[0].owner === cells[8].owner) ||
      (cells[2].owner !== null && cells[2].owner === cells[4].owner && cells[2].owner === cells[6].owner)
    ) {
      return true;
    }

    return false;
  }

  const [winer, setWiner] = useState("");

  const [player, setPlayer] = useState(PLAYERS.X);
  const togglePlayer = () => {
    if (player === PLAYERS.X) {
      setPlayer(PLAYERS.O);
    } else {
      setPlayer(PLAYERS.X);
    }
  }

  useEffect(() => {
    if (checkWinningState()) {
      if (player === PLAYERS.X) {
        setWiner(PLAYERS.O);
      } else {
        setWiner(PLAYERS.X);
      }
    }
  }, [player]);

  return (
    <div className='App'>
      {winer !== "" && <Confetti />}
      <div className='grid'>
        <div className='horizontal-line horizontal-line-1'></div>
        <div className='horizontal-line horizontal-line-2'></div>
        <div className='vertical-line vertical-line-1'></div>
        <div className='vertical-line vertical-line-2'></div>

        {
          cells.map(cell => {
            return <Cell freeze={winer === "" ? true : false}{...cell} key={cell.id} dispatch={dispatch} togglePlayer={togglePlayer} player={player} />
          })
        }
      </div>
      <p className='player'>{winer === "" ? `player : ${player}` : `Winner : ${winer}`}</p>
    </div >
  );
}

export default App;
