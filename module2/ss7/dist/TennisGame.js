"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TennisGame = void 0;
class TennisGame {
    constructor() {
        this.MAX_SCORE = 4;
    }
    getScore(player1Name, player2Name, mScore1, mScore2) {
        if (mScore1 === mScore2) {
            return `${this.getScoreString(mScore1)}-All`;
        }
        if (mScore1 >= this.MAX_SCORE || mScore2 >= this.MAX_SCORE) {
            const minusResult = mScore1 - mScore2;
            if (minusResult === 1) {
                return `Advantage ${player1Name}`;
            }
            if (minusResult === -1) {
                return `Advantage ${player2Name}`;
            }
            return minusResult >= 2 ? `Win for ${player1Name}` : `Win for ${player2Name}`;
        }
        else {
            let score = "";
            let tempScore = 0;
            for (let i = 1; i < 3; i++) {
                if (i === 1) {
                    tempScore = mScore1;
                }
                else {
                    score += "-";
                    tempScore = mScore2;
                }
                score += this.getScoreString(tempScore);
            }
            return score;
        }
    }
    getScoreString(score) {
        switch (score) {
            case 0:
                return "Love";
            case 1:
                return "Fifteen";
            case 2:
                return "Thirty";
            case 3:
                return "Forty";
            default:
                return "Deuce";
        }
    }
}
exports.TennisGame = TennisGame;
