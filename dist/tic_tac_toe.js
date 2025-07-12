import { Markup } from "telegraf";
import { bot } from "./index.js";
const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
const board = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
const X = "❌";
const O = "⭕️";
let player = false;
export function TicTacToe(ctx) {
    ctx.reply(RenderPlayer(), RenderKeyboard());
}
function RenderKeyboard() {
    let counter = 0;
    const keyboard = [[]];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "#") {
            keyboard[keyboard.length - 1].push(Markup.button.callback(numbers[i], i.toString()));
        }
        else {
            keyboard[keyboard.length - 1].push(Markup.button.callback(board[i], i.toString()));
        }
        counter++;
        if (i < board.length - 1 && counter === 3) {
            keyboard.push([]);
            counter = 0;
        }
    }
    return Markup.inlineKeyboard(keyboard);
}
function RenderPlayer() {
    return `Player ${player ? 2 : 1}`;
}
function GameOver(ctx) {
    ctx.editMessageText(`Game Over! ${RenderPlayer()} wins.`);
    ctx.answerCbQuery();
}
function GameCheck(ctx) {
    const symbol = player ? O : X;
    if ((board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
        (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
        (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
        (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
        (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
        (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
        (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
        (board[2] === symbol && board[4] === symbol && board[6] === symbol)) {
        GameOver(ctx);
    }
    else if (!board.includes("#")) {
        ctx.editMessageText(`Game Over! Draw.`, RenderKeyboard());
        ctx.answerCbQuery();
    }
}
export function TicTacToeCallback() {
    for (let i = 0; i < board.length; i++) {
        bot.action(i.toString(), (ctx) => {
            board[i] = player ? O : X;
            ctx.editMessageText(RenderPlayer(), RenderKeyboard());
            ctx.answerCbQuery();
            GameCheck(ctx);
            player = !player;
        });
    }
}
//# sourceMappingURL=tic_tac_toe.js.map