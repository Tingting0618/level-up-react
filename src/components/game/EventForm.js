import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";

export const EventForm = () => {
  const history = useHistory();
//   const {games, getGames} = useContext(GameContext);
 const games = [{
    "id": 1,
    "title": "Welcome To",
    "maker": "Benoit Turpin",
    "number_of_players": 4,
    "skill_level": 3,
    "game_type": {
        "id": 1,
        "label": "Board game"
    },
    "gamer": {
        "id": 1,
        "bio": "Me",
        "user": 1
    }
},
{
    "id": 2,
    "title": "Settlers of Catan",
    "maker": "Klaus Teuber",
    "number_of_players": 4,
    "skill_level": 4,
    "game_type": {
        "id": 1,
        "label": "Board game"
    },
    "gamer": {
        "id": 1,
        "bio": "Me",
        "user": 1
    }
}]

//   useEffect(() => {
//       getGames();
//       console.log(games)
//   }, []);
  

  const [currentEvent, setEvent] = useState({});


  const changeEventTitleState = (domEvent) => {
    const newEventState = { ...currentEvent };
    newEventState.eventTitle = domEvent.target.value;
    setEvent(newEventState);  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventTitleState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          // Create the event

          // Once event is created, redirect user to event list
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};