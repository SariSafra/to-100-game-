import React from "react";

function Winners({ players }) {
    const avg_arr = players.map((player) => {
        if (player.last_scores.length > 0) {
            let sum = 0;
            player.last_scores.map((score) => score == ' ' ? (sum += 0) : (sum += score));
            sum = (sum * 2) / player.last_scores.length;
            return { name: player.name, avg: sum }
        }
        return { name: player.name, avg: Infinity }
    })
    avg_arr.sort(function (a, b) { return a.avg - b.avg })

    return (<>
        <h3>leading players:</h3>
        {avg_arr.map((leader, index) => (index < 3) ? <span key={index} style={{ fontSize: '20px' }}>
            {index > 0 ? "," : ""} {leader.name}: {leader.avg < Infinity ? leader.avg.toFixed(2) : ""}</span> : <></>)}
    </>);
}
export default Winners;