import React from "react";

function Game_button({ buttons, on_button_click }) {
    const handle_click = ({ target }) => {
        const item = target.value;
        on_button_click(item);
    }
    return (<>
        {buttons.map((button, index) => (
            <button onClick={handle_click} value={button} key={index} style={{ border: '1px solid black', margin: '2px' }}>{button}</button>
        ))}
    </>);
}
export default Game_button;