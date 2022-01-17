import React, { useState } from "react";


export const GameContext = React.createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([])
  const [gameTypes, setTypes] = useState([]);

  const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGames);
  };

  const getGameById = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
  };
  const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      method: 'post',
      body: JSON.stringify(game)
    }).then((response) => response.json()).then(setGames);
  };

  const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then((response) => response.json()).then(setTypes);
  };
  const updateGame = game => {
    return fetch(`http://localhost:8088/games/${game.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animal)
    })
      .then(getGames)
  }
  return (
    <GameContext.Provider value={{ games, gameTypes, getGames,getGameById, getGameTypes, createGame,updateGame }}>
      {props.children}
    </GameContext.Provider>
  );
};