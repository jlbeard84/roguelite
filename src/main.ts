import { Game, RlLoader } from "./engine";

var loader = new RlLoader();

var game = new Game();
game.setup(loader);

game.start(loader).then(() => {
    console.log("Game loaded");
});