import { Context, Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';
import { bot } from './index.js';
import { exists, isEqual } from '@utils/index.js';

enum DIRECTION {
	UP,
	LEFT,
	DOWN,
	RIGHT,
}
const MAX_HEIGHT: number = 5;
const MAX_WIDTH: number = 5;
const WALL: string = '⬛️';
const BACKGROUND: string = '⬜️';
const HEAD: string = '🤢';
const BODY: string = '🟢';
const FOOD: string = '🍎';
const KEYBOARD: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([
	[Markup.button.callback('⬆️', 'up')],
	[
		Markup.button.callback('⬅️', 'left'),
		Markup.button.callback('➡️', 'right'),
	],
	[Markup.button.callback('⬇️', 'down')],
]);

const snake_parts: number[][] = [];
let food_coord: number[] = [];

function RenderMap(): string {
	let renderer: string = '';

	renderer += `${WALL.repeat(MAX_WIDTH + 2)}\n${WALL}`;
	for (let y: number = 0; y < MAX_HEIGHT; y++) {
		for (let x: number = 0; x < MAX_WIDTH; x++) {
			if (isEqual(snake_parts[0], [x, y])) {
				renderer += HEAD;
			} else if (exists(snake_parts, [x, y])) {
				renderer += BODY;
			} else if (isEqual([x, y], food_coord)) {
				renderer += FOOD;
			} else {
				renderer += BACKGROUND;
			}
		}
		renderer += `${WALL}\n${WALL}`;
	}
	renderer += `${WALL.repeat(MAX_WIDTH + 1)}`;

	return renderer;
}

function GenerateSnake(): void {
	const random_x: number = Math.floor(Math.random() * MAX_WIDTH);
	const random_y: number = Math.floor(Math.random() * MAX_HEIGHT);
	const random_coord: number[] = [random_x, random_y];

	snake_parts.push(random_coord);
}

function GenerateFood(): void {
	const random_x: number = Math.floor(Math.random() * MAX_WIDTH);
	const random_y: number = Math.floor(Math.random() * MAX_HEIGHT);
	const random_coord: number[] = [random_x, random_y];

	if (!exists(snake_parts, random_coord)) {
		food_coord = random_coord;
	} else {
		GenerateFood();
	}
}

function Move(ctx: Context, direction: DIRECTION): void {
	switch (direction) {
		case DIRECTION.UP:
			if (snake_parts[0][1] - 1 >= 0)
				snake_parts.splice(0, 0, [
					snake_parts[0][0],
					snake_parts[0][1] - 1,
				]);
			else snake_parts.splice(0, 0, [snake_parts[0][0], MAX_HEIGHT - 1]);
			break;
		case DIRECTION.LEFT:
			if (snake_parts[0][0] - 1 >= 0)
				snake_parts.splice(0, 0, [
					snake_parts[0][0] - 1,
					snake_parts[0][1],
				]);
			else snake_parts.splice(0, 0, [MAX_WIDTH - 1, snake_parts[0][1]]);
			break;
		case DIRECTION.DOWN:
			if (snake_parts[0][1] + 1 < MAX_HEIGHT)
				snake_parts.splice(0, 0, [
					snake_parts[0][0],
					snake_parts[0][1] + 1,
				]);
			else snake_parts.splice(0, 0, [snake_parts[0][0], 0]);
			break;
		case DIRECTION.RIGHT:
			if (snake_parts[0][0] + 1 < MAX_WIDTH)
				snake_parts.splice(0, 0, [
					snake_parts[0][0] + 1,
					snake_parts[0][1],
				]);
			else snake_parts.splice(0, 0, [0, snake_parts[0][1]]);
			break;
	}

	if (isEqual(snake_parts[0], food_coord)) {
		GenerateFood();
	} else {
		snake_parts.pop();
	}

	ctx.editMessageText(RenderMap(), KEYBOARD);
	ctx.answerCbQuery();
}

export function Snake(ctx: Context): void {
	GenerateSnake();
	GenerateFood();
	ctx.reply(RenderMap(), KEYBOARD);
}

export function SnakeCallback(): void {
	bot.action('up', (ctx: Context) => {
		Move(ctx, DIRECTION.UP);
	});

	bot.action('left', (ctx: Context) => {
		Move(ctx, DIRECTION.LEFT);
	});

	bot.action('down', (ctx: Context) => {
		Move(ctx, DIRECTION.DOWN);
	});

	bot.action('right', (ctx: Context) => {
		Move(ctx, DIRECTION.RIGHT);
	});
}
