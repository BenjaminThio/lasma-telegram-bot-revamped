import { Markup } from "telegraf";
import { bot } from "./index.js";
const WIDTH = 8;
const HEIGHT = 8;
const WHITE = '⬜️';
const BLACK = '⬛️';
const GREEN = '🟩';
const CHESS = {
    white: {
        pawn: '♙',
        rook: '♖',
        knight: '♘',
        bishop: '♗',
        queen: '♕',
        king: '♔'
    },
    black: {
        pawn: '♟',
        rook: '♜',
        knight: '♞',
        bishop: '♝',
        queen: '♛',
        king: '♚'
    }
};
let pieces = {};
let validMoves = [];
let selected = '';
const player = false;
function MovePawn(color, position, movedOnce) {
    const direction = color === 'black' ? -1 : 1;
    const possibleMoves = [];
    const coordinates = AlgebraicNotationToVector2(position);
    const x_coordinate = coordinates[0];
    const y_coordinate = coordinates[1];
    for (let move = 1; move <= (movedOnce ? 1 : 2); move++) {
        if (y_coordinate + (move * direction) >= 1 && y_coordinate + (move * direction) <= HEIGHT && !Object.keys(pieces).includes(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate + (move * direction)]))) {
            possibleMoves.push(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate + (move * direction)]));
        }
        else {
            break;
        }
    }
    if (x_coordinate - 1 >= 1 && y_coordinate + direction >= 1 && y_coordinate + direction <= HEIGHT &&
        Object.keys(pieces).includes(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate + direction]))) {
        possibleMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate + direction]));
    }
    if (x_coordinate + 1 >= 1 && y_coordinate + direction >= 1 && y_coordinate + direction <= HEIGHT && Object.keys(pieces).includes(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate + direction]))) {
        possibleMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate + direction]));
    }
    return possibleMoves;
}
function MoveRook(position) {
    const coordinates = AlgebraicNotationToVector2(position);
    const x_coordinate = coordinates[0];
    const y_coordinate = coordinates[1];
    let counter = 1;
    while (coordinates[0] - counter >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - counter, y_coordinate]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[0] + counter <= WIDTH) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + counter, y_coordinate]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[1] - counter >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate - counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[1] + counter <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate + counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
}
function MoveKnight(position) {
    const coordinates = AlgebraicNotationToVector2(position);
    const x_coordinate = coordinates[0];
    const y_coordinate = coordinates[1];
    if (x_coordinate - 2 >= 1 && y_coordinate + 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 2, y_coordinate + 1]));
    }
    if (x_coordinate + 2 <= WIDTH && y_coordinate + 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 2, y_coordinate + 1]));
    }
    if (x_coordinate - 2 >= 1 && y_coordinate - 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 2, y_coordinate - 1]));
    }
    if (x_coordinate + 2 <= WIDTH && y_coordinate - 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 2, y_coordinate - 1]));
    }
    if (x_coordinate - 1 >= 1 && y_coordinate + 2 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate + 2]));
    }
    if (x_coordinate + 1 <= WIDTH && y_coordinate + 2 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate + 2]));
    }
    if (x_coordinate - 1 >= 1 && y_coordinate - 2 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate - 2]));
    }
    if (x_coordinate + 1 <= WIDTH && y_coordinate - 2 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate - 2]));
    }
}
function MoveQueen(position) {
    MoveBishop(position);
    MoveRook(position);
}
function MoveKing(position) {
    const coordinates = AlgebraicNotationToVector2(position);
    const x_coordinate = coordinates[0];
    const y_coordinate = coordinates[1];
    if (coordinates[0] - 1 >= 1 && coordinates[1] - 1 >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate - 1]));
    }
    if (coordinates[0] + 1 <= WIDTH && coordinates[1] + 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate + 1]));
    }
    if (coordinates[0] + 1 <= WIDTH && coordinates[1] - 1 >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate - 1]));
    }
    if (coordinates[0] - 1 >= 1 && coordinates[1] + 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate + 1]));
    }
    if (coordinates[0] - 1 >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - 1, y_coordinate]));
    }
    if (coordinates[0] + 1 <= WIDTH) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + 1, y_coordinate]));
    }
    if (coordinates[1] - 1 >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate - 1]));
    }
    if (coordinates[1] + 1 <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate, y_coordinate + 1]));
    }
}
function MoveBishop(position) {
    const coordinates = AlgebraicNotationToVector2(position);
    const x_coordinate = coordinates[0];
    const y_coordinate = coordinates[1];
    let counter = 1;
    while (coordinates[0] - counter >= 1 && coordinates[1] - counter >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - counter, y_coordinate - counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[0] + counter <= WIDTH && coordinates[1] + counter <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + counter, y_coordinate + counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[0] + counter <= WIDTH && coordinates[1] - counter >= 1) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate + counter, y_coordinate - counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
    while (coordinates[0] - counter >= 1 && coordinates[1] + counter <= HEIGHT) {
        validMoves.push(Vector2ToAlgebraicNotation([x_coordinate - counter, y_coordinate + counter]));
        counter++;
    }
    console.log(counter);
    counter = 0;
}
function RenderKeyboard() {
    const keyboard = [];
    for (let y = HEIGHT; y >= 1; y--) {
        keyboard.push([]);
        for (let x = 1; x <= WIDTH; x++) {
            const coord = Vector2ToAlgebraicNotation([x, y]);
            if (validMoves.includes(coord)) {
                keyboard[keyboard.length - 1].push(Markup.button.callback(GREEN, `chess ${coord}`));
            }
            else if (Object.keys(pieces).includes(coord)) {
                const piece = pieces[coord];
                keyboard[keyboard.length - 1].push(Markup.button.callback(CHESS[piece.color][piece.name], `chess ${coord}`));
            }
            else if ((x + y) % 2 === 0) {
                keyboard[keyboard.length - 1].push(Markup.button.callback(BLACK, `chess ${coord}`));
            }
            else {
                keyboard[keyboard.length - 1].push(Markup.button.callback(WHITE, `chess ${coord}`));
            }
        }
        ;
    }
    ;
    return Markup.inlineKeyboard(keyboard);
}
export function ChessCallback() {
    bot.action(/chess ([a-h][1-8])/, (ctx) => {
        const selected_coord = ctx.match[1];
        if (Object.keys(pieces).includes(selected_coord)) {
            const piece = pieces[selected_coord];
            if (piece.color === (player ? 'white' : 'black')) {
                return;
            }
            else if (piece.name === 'pawn') {
                selected = selected_coord;
                validMoves = MovePawn(pieces[selected_coord].color, selected_coord, piece.movedOnce);
            }
            else if (piece.name === 'rook') {
                selected = selected_coord;
                MoveRook(selected_coord);
            }
            else if (piece.name === 'bishop') {
                selected = selected_coord;
                MoveBishop(selected_coord);
            }
            else if (piece.name === 'queen') {
                selected = selected_coord;
                MoveQueen(selected_coord);
            }
            else if (piece.name === 'knight') {
                selected = selected_coord;
                MoveKnight(selected_coord);
            }
            else if (piece.name === 'king') {
                selected = selected_coord;
                MoveKing(selected_coord);
            }
        }
        else if (validMoves.includes(selected_coord)) {
            pieces[selected_coord] = pieces[selected];
            delete pieces[selected];
            selected = '';
            validMoves = [];
        }
        ctx.editMessageText(RenderBoard(), RenderKeyboard());
        ctx.answerCbQuery();
    });
}
function Vector2ToAlgebraicNotation(vector2) {
    return `${IntToAlpha(vector2[0])}${vector2[1]}`;
}
function AlgebraicNotationToVector2(algebraicNotation) {
    const splitAlgebraicNotation = algebraicNotation.split('');
    const x = AlphaToInt(splitAlgebraicNotation[0]);
    const y = parseInt(splitAlgebraicNotation[1]);
    return [x, y];
}
function IntToAlpha(int, isUpper = false) {
    const offset = isUpper ? 64 : 96;
    return String.fromCharCode(int + offset);
}
function AlphaToInt(char) {
    const ascii = char.charCodeAt(0);
    if (ascii >= 97 && ascii <= 122) {
        return ascii - 96;
    }
    else if (ascii >= 65 && ascii <= 90) {
        return ascii - 64;
    }
    return NaN;
}
function GeneratePieces() {
    pieces = {};
    for (const [color, yAxis] of [['white', 1], ['black', 8]]) {
        pieces[`a${yAxis}`] = { color: color, name: 'rook' };
        pieces[`b${yAxis}`] = { color: color, name: 'knight' };
        pieces[`c${yAxis}`] = { color: color, name: 'bishop' };
        pieces[`d${yAxis}`] = { color: color, name: 'queen' };
        pieces[`e${yAxis}`] = { color: color, name: 'king' };
        pieces[`f${yAxis}`] = { color: color, name: 'bishop' };
        pieces[`g${yAxis}`] = { color: color, name: 'knight' };
        pieces[`h${yAxis}`] = { color: color, name: 'rook' };
    }
    ;
    for (let x = 1; x <= WIDTH; x++) {
        //pieces[`${IntToAlpha(x)}7`] = {color: 'black', name: 'pawn', movedOnce: false};
        //pieces[`${IntToAlpha(x)}2`] = {color: 'white', name: 'pawn', movedOnce: false};
    }
    ;
}
function RenderBoard() {
    let renderer = '';
    for (let y = HEIGHT; y >= 1; y--) {
        for (let x = 1; x <= WIDTH; x++) {
            const coord = Vector2ToAlgebraicNotation([x, y]);
            if (Object.keys(pieces).includes(coord)) {
                const piece = pieces[coord];
                renderer += CHESS[piece.color][piece.name];
            }
            else if ((x + y) % 2 === 0) {
                renderer += BLACK;
            }
            else {
                renderer += WHITE;
            }
        }
        ;
        renderer += '\n';
    }
    ;
    return renderer;
}
export function PlayChess(ctx) {
    GeneratePieces();
    ctx.reply(RenderBoard(), RenderKeyboard());
}
//# sourceMappingURL=chess.js.map