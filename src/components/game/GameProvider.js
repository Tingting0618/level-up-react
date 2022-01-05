import React, { useState,createContext } from "react";


export const GameContext = React.createContext();

export const GameProvider = (props) => {
  // const GameContext = createContext()
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
    return fetch("http://localhost:8000/gametypes", {headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then((response) => response.json()).then(setTypes);
  };

  return (
    <GameContext.Provider value={{ games, gameTypes, getGames,getGameTypes,createGame }}>
      {props.children}
    </GameContext.Provider>
  );
};