"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TennisGame_1 = require("./TennisGame");
let game = new TennisGame_1.TennisGame();
console.log(game.getScore("player1", "player2", 6, 8));
