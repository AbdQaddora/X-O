import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";

import { PLAYERS } from './App';
export default function Cell({ id, owned, owner, dispatch, togglePlayer, player, freeze }) {
    return (
        <div className='cell' onClick={() => {
            if (!owned && freeze) {
                dispatch({ type: "OWN", payload: { id: id, player: player } });
                togglePlayer();
            }
        }}>
            {owned && <div className='icon'>{owner === PLAYERS.X ? <AiOutlineClose /> : <BsCircle />}</div>}
        </div>
    )
}
