import { Telegraf } from 'telegraf';
import { Snake, SnakeCallback } from './snake.js';
import { TicTacToe, TicTacToeCallback } from './tic_tac_toe.js';
import { Temperature, Weather } from './weather.js';
import { ChessCallback, PlayChess } from './chess.js';
import { Sokoban } from './sokoban.js';
export const bot = new Telegraf('5971928726:AAHmd3HyF-kkKd2c2YeDttnxipEWdgZiVCo');
bot.command('sokoban', (ctx) => {
    ctx.reply('TEST');
    Sokoban(ctx);
});
bot.command('chess', (ctx) => {
    PlayChess(ctx);
});
bot.command('snake', (ctx) => {
    Snake(ctx);
});
bot.command('tic_tac_toe', (ctx) => {
    TicTacToe(ctx);
});
bot.command('weather', (ctx) => {
    Weather(ctx);
});
bot.command('temp', (ctx) => {
    Temperature(ctx);
});
bot.command('test', Telegraf.reply('λ'));
SnakeCallback();
TicTacToeCallback();
ChessCallback();
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=index.js.map