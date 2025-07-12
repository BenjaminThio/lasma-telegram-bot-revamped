import { Context, Markup } from 'telegraf';
import { bot } from './index.js';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/types';
import { groupArray } from '@utils/index.js';

const numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
const board = ['#', '#', '#', '#', '#', '#', '#', '#', '#'];
const X: string = '❌';
const O: string = '⭕️';
let player: boolean = false;

export function TicTacToe(ctx: Context): void {
	ctx.reply(RenderPlayer(), RenderKeyboard());
}

function RenderKeyboard(): Markup.Markup<InlineKeyboardMarkup> {
	const keyboard: InlineKeyboardButton.CallbackButton[] = [];

	for (let i: number = 0; i < board.length; i++) {
		if (board[i] === '#') {
			keyboard.push(
				Markup.button.callback(numbers[i], i.toString())
			);
		} else {
			keyboard.push(
				Markup.button.callback(board[i], i.toString())
			);
		}
	}

	return Markup.inlineKeyboard(groupArray(keyboard, 3));
}

function RenderPlayer(): string {
	return `Player ${player ? 2 : 1}`;
}

function GameOver(ctx: Context): void {
	ctx.editMessageText(`Game Over! ${RenderPlayer()} wins.`);
	ctx.answerCbQuery();
}

function GameCheck(ctx: Context): void {
	const symbol: string = player ? O : X;

	if (
		(board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
		(board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
		(board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
		(board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
		(board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
		(board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
		(board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
		(board[2] === symbol && board[4] === symbol && board[6] === symbol)
	) {
		GameOver(ctx);
	} else if (!board.includes('#')) {
		ctx.editMessageText(`Game Over! Draw.`, RenderKeyboard());
		ctx.answerCbQuery();
	}
}

export function TicTacToeCallback(): void {
	for (let i: number = 0; i < board.length; i++) {
		bot.action(i.toString(), (ctx) => {
			board[i] = player ? O : X;
			ctx.editMessageText(RenderPlayer(), RenderKeyboard());
			ctx.answerCbQuery();

			GameCheck(ctx);
			player = !player;
		});
	}
}
