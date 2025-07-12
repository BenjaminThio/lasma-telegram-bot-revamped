import { Markup } from 'telegraf';
import { bot } from './index.js';
import { exists, isEqual } from '@utils/index.js';
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["LEFT"] = 1] = "LEFT";
    DIRECTION[DIRECTION["DOWN"] = 2] = "DOWN";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
})(DIRECTION || (DIRECTION = {}));
const MAX_HEIGHT = 5;
const MAX_WIDTH = 5;
const WALL = '⬛️';
const BACKGROUND = '⬜️';
const HEAD = '🤢';
const BODY = '🟢';
const FOOD = '🍎';
const KEYBOARD = Markup.inlineKeyboard([
    [Markup.button.callback('⬆️', 'up')],
    [
        Markup.button.callback('⬅️', 'left'),
        Markup.button.callback('➡️', 'right'),
    ],
    [Markup.button.callback('⬇️', 'down')],
]);
const snake_parts = [];
let food_coord = [];
function RenderMap() {
    let renderer = '';
    renderer += `${WALL.repeat(MAX_WIDTH + 2)}\n${WALL}`;
    for (let y = 0; y < MAX_HEIGHT; y++) {
        for (let x = 0; x < MAX_WIDTH; x++) {
            if (isEqual(snake_parts[0], [x, y])) {
                renderer += HEAD;
            }
            else if (exists(snake_parts, [x, y])) {
                renderer += BODY;
            }
            else if (isEqual([x, y], food_coord)) {
                renderer += FOOD;
            }
            else {
                renderer += BACKGROUND;
            }
        }
        renderer += `${WALL}\n${WALL}`;
    }
    renderer += `${WALL.repeat(MAX_WIDTH + 1)}`;
    return renderer;
}
function GenerateSnake() {
    const random_x = Math.floor(Math.random() * MAX_WIDTH);
    const random_y = Math.floor(Math.random() * MAX_HEIGHT);
    const random_coord = [random_x, random_y];
    snake_parts.push(random_coord);
}
function GenerateFood() {
    const random_x = Math.floor(Math.random() * MAX_WIDTH);
    const random_y = Math.floor(Math.random() * MAX_HEIGHT);
    const random_coord = [random_x, random_y];
    if (!exists(snake_parts, random_coord)) {
        food_coord = random_coord;
    }
    else {
        GenerateFood();
    }
}
function Move(ctx, direction) {
    switch (direction) {
        case DIRECTION.UP:
            if (snake_parts[0][1] - 1 >= 0)
                snake_parts.splice(0, 0, [
                    snake_parts[0][0],
                    snake_parts[0][1] - 1,
                ]);
            else
                snake_parts.splice(0, 0, [snake_parts[0][0], MAX_HEIGHT - 1]);
            break;
        case DIRECTION.LEFT:
            if (snake_parts[0][0] - 1 >= 0)
                snake_parts.splice(0, 0, [
                    snake_parts[0][0] - 1,
                    snake_parts[0][1],
                ]);
            else
                snake_parts.splice(0, 0, [MAX_WIDTH - 1, snake_parts[0][1]]);
            break;
        case DIRECTION.DOWN:
            if (snake_parts[0][1] + 1 < MAX_HEIGHT)
                snake_parts.splice(0, 0, [
                    snake_parts[0][0],
                    snake_parts[0][1] + 1,
                ]);
            else
                snake_parts.splice(0, 0, [snake_parts[0][0], 0]);
            break;
        case DIRECTION.RIGHT:
            if (snake_parts[0][0] + 1 < MAX_WIDTH)
                snake_parts.splice(0, 0, [
                    snake_parts[0][0] + 1,
                    snake_parts[0][1],
                ]);
            else
                snake_parts.splice(0, 0, [0, snake_parts[0][1]]);
            break;
    }
    if (isEqual(snake_parts[0], food_coord)) {
        GenerateFood();
    }
    else {
        snake_parts.pop();
    }
    ctx.editMessageText(RenderMap(), KEYBOARD);
    ctx.answerCbQuery();
}
export function Snake(ctx) {
    GenerateSnake();
    GenerateFood();
    ctx.reply(RenderMap(), KEYBOARD);
}
export function SnakeCallback() {
    bot.action('up', (ctx) => {
        Move(ctx, DIRECTION.UP);
    });
    bot.action('left', (ctx) => {
        Move(ctx, DIRECTION.LEFT);
    });
    bot.action('down', (ctx) => {
        Move(ctx, DIRECTION.DOWN);
    });
    bot.action('right', (ctx) => {
        Move(ctx, DIRECTION.RIGHT);
    });
}
//# sourceMappingURL=snake.js.map