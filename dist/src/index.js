import { Telegraf } from 'telegraf';
import { Snake, SnakeCallback } from './snake.js';
import { TicTacToe, TicTacToeCallback } from './tic_tac_toe.js';
import { Temperature, Weather } from './weather.js';
import { ChessCallback, PlayChess } from './chess.js';
import { Sokoban, SokobanCallback } from './sokoban.js';
import { Dict } from './dictionary.js';
import { test, Time } from './datetime.js';
import { Calculator, CalculatorCallback } from './calculator.js';
export const bot = new Telegraf('5971928726:AAHmd3HyF-kkKd2c2YeDttnxipEWdgZiVCo');
bot.command('calc', (ctx) => {
    Calculator(ctx);
});
bot.command('date', (ctx) => {
    test(ctx);
});
bot.command('time', (ctx) => {
    Time(ctx);
});
bot.command('d', (ctx) => {
    Dict(ctx);
});
bot.command('sokoban', (ctx) => {
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
SokobanCallback();
CalculatorCallback();
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
console.log(process.memoryUsage());
//# sourceMappingURL=index.js.map