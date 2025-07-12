import { Markup } from 'telegraf';
import { bot } from './index.js';
import { exists, indexOf, isEqual } from '@utils/index.js';
const HEIGHT = 5;
const WIDTH = 7;
const BOX_QUANTITY = 3;
const BARRIER_QUANTITY = 3;
const BACKGROUND = '⬜️';
const BARRIER = '🟨';
const BOX = '📦';
const DESTINATION = '❎';
const PLAYER = '🥺';
let player = [];
let barriers = [];
let boxes = [];
let destinations = [];
const KEYBOARD = Markup.inlineKeyboard([
    [Markup.button.callback('⬆️', 'sokoban 0')],
    [
        Markup.button.callback('⬅️', 'sokoban 1'),
        Markup.button.callback('🔄', 'sokoban reshuffle'),
        Markup.button.callback('➡️', 'sokoban 3'),
    ],
    [Markup.button.callback('⬇️', 'sokoban 2')],
]);
function Reshuffle() {
    const coordinates = [];
    barriers = [];
    boxes = [];
    destinations = [];
    player = [];
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            coordinates.push([x, y]);
        }
    }
    for (let _i = 0; _i < BARRIER_QUANTITY; _i++) {
        const randomIndex = Math.floor(Math.random() * coordinates.length);
        barriers.push(coordinates[randomIndex]);
        coordinates.splice(randomIndex, 1);
    }
    for (let _i = 0; _i < BOX_QUANTITY; _i++) {
        const randomBoxIndex = Math.floor(Math.random() * coordinates.length);
        boxes.push(coordinates[randomBoxIndex]);
        coordinates.splice(randomBoxIndex, 1);
        const randomDestinationIndex = Math.floor(Math.random() * coordinates.length);
        destinations.push(coordinates[randomDestinationIndex]);
        coordinates.splice(randomDestinationIndex, 1);
    }
    player = coordinates[Math.floor(Math.random() * coordinates.length)];
    console.log(barriers, boxes, destinations, player);
}
function RenderMap() {
    let renderer = '';
    renderer += `${BARRIER.repeat(WIDTH + 2)}\n${BARRIER}`;
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (isEqual(player, [x, y])) {
                renderer += PLAYER;
            }
            else if (exists(barriers, [x, y]) || exists(boxes, [x, y]) && exists(destinations, [x, y])) {
                renderer += BARRIER;
            }
            else if (exists(boxes, [x, y])) {
                renderer += BOX;
            }
            else if (exists(destinations, [x, y])) {
                renderer += DESTINATION;
            }
            else {
                renderer += BACKGROUND;
            }
        }
        renderer += `${BARRIER}\n${BARRIER}`;
    }
    renderer += BARRIER.repeat(WIDTH + 1);
    return renderer;
}
export function Sokoban(ctx) {
    Reshuffle();
    ctx.reply(RenderMap(), KEYBOARD);
}
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["LEFT"] = 1] = "LEFT";
    DIRECTION[DIRECTION["DOWN"] = 2] = "DOWN";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
})(DIRECTION || (DIRECTION = {}));
export function SokobanCallback() {
    bot.action(/sokoban ([0-3])/, (ctx) => {
        const direction = parseInt(ctx.match[1]);
        switch (direction) {
            case DIRECTION.UP:
                MovePlayer(ctx, 0, -1);
                break;
            case DIRECTION.LEFT:
                MovePlayer(ctx, -1, 0);
                break;
            case DIRECTION.DOWN:
                MovePlayer(ctx, 0, 1);
                break;
            case DIRECTION.RIGHT:
                MovePlayer(ctx, 1, 0);
                break;
        }
    });
    bot.action('sokoban reshuffle', (ctx) => {
        Reshuffle();
        ctx.editMessageText(RenderMap(), KEYBOARD);
    });
}
function MovePlayer(ctx, x, y) {
    let xCoord = player[0];
    let yCoord = player[1];
    if (xCoord + x >= 0 && xCoord + x < WIDTH) {
        xCoord += x;
    }
    else if (xCoord + x >= 0) {
        xCoord = 0;
    }
    else {
        xCoord = WIDTH - 1;
    }
    if (yCoord + y >= 0 && yCoord + y < HEIGHT) {
        yCoord += y;
    }
    else if (yCoord + y >= 0) {
        yCoord = 0;
    }
    else {
        yCoord = HEIGHT - 1;
    }
    if (exists(barriers.concat(destinations), [xCoord, yCoord])) {
        return;
    }
    else if (exists(boxes, [xCoord, yCoord])) {
        const boxIndex = indexOf(boxes, [xCoord, yCoord]);
        const newPosition = MoveBox(boxIndex, x, y);
        if (newPosition === undefined) {
            return;
        }
        else {
            boxes[boxIndex] = newPosition;
        }
    }
    player = [xCoord, yCoord];
    ctx.editMessageText(RenderMap(), KEYBOARD);
}
function MoveBox(boxIndex, x, y) {
    let xCoord = boxes[boxIndex][0];
    let yCoord = boxes[boxIndex][1];
    if (xCoord + x >= 0 && xCoord + x < WIDTH) {
        xCoord += x;
    }
    else if (xCoord + x >= 0) {
        xCoord = 0;
    }
    else {
        xCoord = WIDTH - 1;
    }
    if (yCoord + y >= 0 && yCoord + y < HEIGHT) {
        yCoord += y;
    }
    else if (yCoord + y >= 0) {
        yCoord = 0;
    }
    else {
        yCoord = HEIGHT - 1;
    }
    if (exists(barriers, [xCoord, yCoord])) {
        return;
    }
    else {
        return [xCoord, yCoord];
    }
}
//# sourceMappingURL=sokoban.js.map