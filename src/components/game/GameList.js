import React, { useContext, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameList = (props) => {
    const history = useHistory();
    const { games, getGames } = useContext(GameContext);

    useEffect(() => {
        getGames();
    }, []);

    return (
        <article className="games">
            <header className="games__header">
                <h1>Level Up Games</h1>
            </header>
            <div className="button--group">
                <span class="fa fa-star checked"></span>
                <button
                    className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" });
                    }}
                >
                    Register New Game
                </button>
            </div>
            {games.map((game) => {
                return (
                    <section key={`game--${game.id}`} className="game">

                        <div className="game__title">
                            {game.title} by {game.maker}
                        </div>
                        <div className="game__players">
                            {game.number_of_players} players needed
                        </div>
                        <div className="game__skillLevel">
                            Skill level is {game.skill_level}
                        </div>
                        <div className="game__edit">
                            <button className='btn btn-2'
                                onClick={() => {
                                    history.push(`/games/${game.id}/edit`)
                                }}
                            >Edit</button>
                        </div>
                    </section>
                );
            })}
        </article>
    );
};