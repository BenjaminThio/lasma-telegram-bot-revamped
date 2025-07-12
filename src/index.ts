import { Context, Telegraf } from 'telegraf';
import { Snake, SnakeCallback } from './snake.js';
import { TicTacToe, TicTacToeCallback } from './tic_tac_toe.js';
import { Temperature, Weather, WeatherContext } from './weather.js';
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
bot.command('sokoban', (ctx: Context) => {
	Sokoban(ctx);
});
bot.command('chess', (ctx: Context) => {
	PlayChess(ctx);
});
bot.command('snake', (ctx: Context) => {
	Snake(ctx);
});
bot.command('tic_tac_toe', (ctx: Context) => {
	TicTacToe(ctx);
});
bot.command('weather', (ctx: WeatherContext) => {
	Weather(ctx);
});
bot.command('temp', (ctx: WeatherContext) => {
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
