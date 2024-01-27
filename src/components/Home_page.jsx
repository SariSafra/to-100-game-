import React, { useState } from "react";
import Game_board from "./Game_board";
import Winners from "./Winners";

function Home_page() {
    let arr = JSON.parse(localStorage.getItem("saved_players"));
    const [players, set_players] = useState(arr ? arr : [])

    const add_gamer = () => {
        let person = prompt("Please enter your name");
        if (!person) {
            alert("no name entered");
            return;
        }
        let is_new_player = true;
        set_players((players) => {
            const play = players.map((player) => {
                if (player.name === person) {
                    player.is_active = true;
                    is_new_player = false;
                }
                return player
            })
            return is_new_player ? [...players, { name: person, is_active: true, last_scores: [], disable: true }] : play;
        })
    }

    const exit_gamer = (person, last_scores, choice) => {
        const players_to_save = players.map((player) => {
            if (player.name === person) {
                player.disable = choice ? true : player.disable;
                player.is_active = choice ? false : player.is_active;
                player.last_scores = last_scores;
            }
            return player;
        })
        set_players(players_to_save)
        localStorage.setItem("saved_players", JSON.stringify(players_to_save))
    }

    const move_turn = (indexP) => {
        let index = indexP + 1;
        if (index == players.length)
            index = 0;
        while (!players[index].is_active) {
            index = index + 1;
            if (index == players.length)
                index = 0;
        }
        set_players((players) =>
            players.map((player, i) => {
                if (index == i && player.is_active)
                    player.disable = false;
                else player.disable = true;
                return player;
            })
        )
    }

    const able_first_player = () => {
        let first_player = false;
        players.map((player) => {
            if (!player.disable)
                first_player = true;
        })
        set_players((players) =>
            players.map((player) => {
                if (!first_player && player.is_active) {
                    player.disable = false;
                    first_player = true;
                }
                return player;
            })
        )
    }


    return (<>
        <button onClick={add_gamer}>add gamer</button>
        <button onClick={able_first_player}>start game!</button>
        <div>
            <Winners players={players} />
        </div>
        {players.map((player, i) => { return (player.is_active ? <Game_board key={i} player={player} exit_func={exit_gamer} next_player={move_turn} index={i} /> : <></>) })}
    </>)
}

export default Home_page