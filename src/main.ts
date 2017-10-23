import { Game } from "./engines";

var game = new Game();

game.start().then(() => {
    console.log("Game loaded");
});