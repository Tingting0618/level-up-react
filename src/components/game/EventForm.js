import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";
import { EventContext } from "./EventProvider.js";

export const EventForm = () => {

    const history = useHistory();
    const { games, getGames } = useContext(GameContext);
    const {createEvent}= useContext(EventContext);
    useEffect(() => {
        getGames();
    }, []);

    const [currentEvent, setCurrentEvent] = useState({
        gameId: 1,
        description: "",
        date:" ",
        time:" ",
    });



    const changeEventTitleState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState.gameId = domEvent.target.value;
        setCurrentEvent(newEventState);
    };
    const changeEventDescState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState.description = domEvent.target.value;
        setCurrentEvent(newEventState);
    };

    const changeEventDateState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState.date = domEvent.target.value;
        setCurrentEvent(newEventState);
    };

    const changeEventTimeState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState.time = domEvent.target.value;
        setCurrentEvent(newEventState);
    };
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

                <div className="form-group">
                    <label htmlFor="desc">Description: </label>
                    <input
                        type="text"
                        name="desc"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                        type="date"
                        name="date"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input
                        type="time"
                        name="time"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button
                type="submit"
                onClick={(evt) => {
                    evt.preventDefault();

                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    };
                
                    // Send POST request to your API
                    createEvent(event).then(() => history.push("/events"));
                }}
                className="btn btn-primary"
            >
                Create Event
            </button>
        </form>
    );
};
