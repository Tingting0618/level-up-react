import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory, useParams } from "react-router-dom";

export const GameForm = () => {
    const { gameId } = useParams();
    const history = useHistory();
    const { createGame, updateGame,getGameTypes, gameTypes, getGameById } = useContext(GameContext);
    /*
          Since the input fields are bound to the values of
          the properties of this state variable, you need to
          provide some default values.
      */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 1,
    });

    /*
          Get game types on initialization so that the <select>
          element presents game type choices to the user.
      */
    useEffect(() => {
        getGameTypes().then(() => {
            if (gameId) {
                getGameById(gameId)
                    .then(game => {
                        setCurrentGame({
                            id : gameId,
                            skillLevel: game.skill_level,
                            numberOfPlayers: game.number_of_players,
                            title: game.title,
                            maker: game.maker,
                            gameTypeId: game.game_type.id
                        })
                    })
            } else {
            }
        })
    }, [])
    /*
          REFACTOR CHALLENGE START
  
          Can you refactor this code so that all property
          state changes can be handled with a single function
          instead of five functions that all, largely, do
          the same thing?
  
          One hint: [event.target.name]
      */
    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame };
        newGameState.title = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame };
        newGameState.maker = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame };
        newGameState.numberOfPlayers = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame };
        newGameState.skillLevel = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame };
        newGameState.gameTypeId = event.target.value;
        setCurrentGame(newGameState);
    };
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        required
                        autoFocus
                        className="form-control"
                        value={currentGame.title}
                        onChange={changeGameTitleState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input
                        type="text"
                        name="maker"
                        required
                        autoFocus
                        className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameMakerState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="level">Skill Level: </label>
                    <select
                        name="level"
                        required
                        autoFocus
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameSkillLevelState}
                    >
                        <option value="0">Select a skill level...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="player">Enter number of players needed: </label>
                    <input
                        type="number"
                        name="player"
                        required
                        autoFocus
                        className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGamePlayersState}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="type">Game Type: </label>
                    <select
                        name="type"
                        required
                        autoFocus
                        className="form-control"
                        // value={currentGame.gameTypeId}
                        value={currentGame.gameTypeId}
                        onChange={changeGameTypeState}
                    >
                        <option value="0">Select a game type...</option>
                        {gameTypes.map((gameType) => (
                            <option value={gameType.id}>{gameType.label}</option>
                        ))}
                    </select>
                </div>

            </fieldset>

            <button
                type="submit"
                onClick={(evt) => {
                    // Prevent form from being submitted
                    evt.preventDefault();

                    const game = {
                        title: currentGame.title,
                        maker: currentGame.maker,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        id:parseInt(currentGame.id)
                    };
                    {gameId ? updateGame(game).then(() => history.push("/games")) : createGame(game).then(() => history.push("/games"))}
                    // Send POST request to your API
                    // createGame(game).then(() => history.push("/games"));
                }}
                className="btn btn-primary"
            >
                {gameId ? <>Save Game</> : <>Create Game</>}
            </button>
        </form >
    );
};