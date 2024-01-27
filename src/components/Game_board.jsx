import React, { useState } from "react";
import Game_button from "./Game_button";

const game_options = ['-1', '+1', '*2', '/2']
const end_game_options = ['exit', 'new game']

function Game_board({ player, exit_func, next_player, index }) {
    const [number, set_number] = useState(Math.floor(Math.random() * 100));
    const [active, set_active] = useState(true);
    const [step, set_step] = useState(0);
    const [last_scores, set_last_scores] = useState(player.last_scores)

    const update_number = (button) => {
        let newNum = 0;
        switch (button) {
            case '+1':
                newNum = (number + 1);
                break;
            case '-1':
                newNum = (number - 1);
                break;
            case '*2':
                newNum = (number * 2);
                break;
            case '/2':
                newNum = (Math.floor(number / 2));
                break;
        }
        set_step(step + 1);
        set_number(newNum);
        if (newNum === 100) {
            set_active(false);
            set_last_scores([...last_scores, step + 1, " "]);
        }
        next_player(index);
    }

    const next_step = (choice) => {
        next_player(index);
        let is_exit = 0;
        switch (choice) {
            case 'new game':
                set_step(0);
                set_number(Math.floor(Math.random() * 100));
                set_active(true)
                break;
            case 'exit':
                set_active(false)
                is_exit = 1;
                break;
        }
        exit_func(player.name, last_scores, is_exit);
    }

    const none = () => {
        return
    }

    return (
        <div className={player.disable ? 'disable_game-board' : 'game-board'} style={player.disable ? { cursor: 'not-allowed' } : { backgroundColor: '#f5f5ff', borderRadius: '25px' }}>
            <h4>player : {player.name}</h4>
            <h4>number : {number}</h4>
            <Game_button buttons={active ? game_options : end_game_options} on_button_click={player.disable ? none : (active ? update_number : next_step)} />
            <h4>steps : {step}</h4>
            <h4>last scores : {last_scores}</h4>
        </div>
    )
}
export default Game_board