import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { EventProvider } from "./game/EventProvider.js";
import { ProfileProvider } from "./auth/ProfileProvider.js";
import { Profile } from "./auth/Profile.js";
import { EventList } from "./game/EventList.js";
import { GameForm } from "./game/GameForm.js";
import { EventForm } from "./game/EventForm.js";
import './LevelUp.css';

export const ApplicationViews = () => {
    return (
        <>
            <main
                style={{
                    margin: "3rem 2rem",
                    lineHeight: "1.75rem",
                }}
            >
                <GameProvider>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                </GameProvider>

                <GameProvider>
                    <Route exact path="/games/new">
                        <GameForm />
                    </Route>
                </GameProvider>

                <EventProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                </EventProvider>

                <EventProvider>
                    <GameProvider>
                        <Route exact path="/events/new">
                            <EventForm />
                        </Route>
                    </GameProvider>
                </EventProvider>

                <ProfileProvider>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </ProfileProvider>

                <GameProvider>
                    <Route exact path="/games/:gameId(\d+)/edit">
                        <GameForm />
                    </Route>
                </GameProvider>

            </main>
        </>
    );
};