import { Context, Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';
import { bot } from './index.js';

/*
interface ExtendedContext extends Context {
    args: string[];
}
    */

enum OPTIONS {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    SHIFT,
    ALPHA,
    UP,
    MENU,
    ON,
    OPTION,
    CALCULATE,
    LEFT,
    RIGHT,
    ALGEBRA,
    DOWN,
    SQUARE_ROOT,
    POWER_OF_TWO,
    POWER,
    LOGARITHMS,
    NATURAL_LOGARITHM,
    NEGATIVE,
    POWER_OF_NEGATIVE_ONE,
    SINE,
    COSINE,
    TANGENT,
    LEFT_PARENTHESIS,
    RIGHT_PARENTHESIS,
    DELETE,
    ALL_CLEAR,
    MULTIPLY,
    DIVIDE,
    PLUS,
    MINUS,
    ANSWER,
    EQUAL
}

const KEYBOARD: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([
    [
        Markup.button.callback('SHIFT', `cal ${OPTIONS.SHIFT}`),
        Markup.button.callback('ALPHA', `cal ${OPTIONS.ALPHA}`),
        Markup.button.callback('⬆️', `cal ${OPTIONS.UP}`),
        Markup.button.callback('MENU', `cal ${OPTIONS.MENU}`),
        Markup.button.callback('ON', `cal ${OPTIONS.ON}`)
    ],
    [
        Markup.button.callback('OPTN', `cal ${OPTIONS.OPTION}`),
        Markup.button.callback('CALC', `cal ${OPTIONS.CALCULATE}`),
        Markup.button.callback('⬅️', `cal ${OPTIONS.LEFT}`),
        Markup.button.callback('➡️', `cal ${OPTIONS.RIGHT}`),
        Markup.button.callback('???', 'cal -1'),
        Markup.button.callback('x', `cal ${OPTIONS.ALGEBRA}`)
    ],
    [
        Markup.button.callback('⬇️', `cal ${OPTIONS.DOWN}`)
    ],
    [
        Markup.button.callback('/', `cal ${OPTIONS.DIVIDE}`),
        Markup.button.callback('√', `cal ${OPTIONS.SQUARE_ROOT}`),
        Markup.button.callback('x²', `cal ${OPTIONS.POWER_OF_TWO}`),
        Markup.button.callback('x▝', `cal ${OPTIONS.POWER}`),
        Markup.button.callback('log▗▯', `cal ${OPTIONS.LOGARITHMS}`),
        Markup.button.callback('ln', `cal ${OPTIONS.NATURAL_LOGARITHM}`)
    ],
    [
        Markup.button.callback('-', `cal ${OPTIONS.MINUS}`),
        Markup.button.callback('°\' "', 'cal -1'),
        Markup.button.callback('x⁻¹', `cal ${OPTIONS.POWER_OF_NEGATIVE_ONE}`),
        Markup.button.callback('sin', `cal ${OPTIONS.SINE}`),
        Markup.button.callback('cos', `cal ${OPTIONS.COSINE}`),
        Markup.button.callback('tan', `cal ${OPTIONS.TANGENT}`)
    ],
    [
        Markup.button.callback('STO', 'cal -1'),
        Markup.button.callback('ENG', 'cal -1'),
        Markup.button.callback('(', `cal ${OPTIONS.LEFT_PARENTHESIS}`),
        Markup.button.callback(')', `cal ${OPTIONS.RIGHT_PARENTHESIS}`),
        Markup.button.callback('S⇔D', 'cal -1'),
        Markup.button.callback('M+', 'cal -1')
    ],
    [
        Markup.button.callback('7', `cal ${OPTIONS.SEVEN}`),
        Markup.button.callback('8', `cal ${OPTIONS.EIGHT}`),
        Markup.button.callback('9', `cal ${OPTIONS.NINE}`),
        Markup.button.callback('DEL', `cal ${OPTIONS.DELETE}`),
        Markup.button.callback('AC', `cal ${OPTIONS.ALL_CLEAR}`)
    ],
    [
        Markup.button.callback('4', `cal ${OPTIONS.FOUR}`),
        Markup.button.callback('5', `cal ${OPTIONS.FIVE}`),
        Markup.button.callback('6', `cal ${OPTIONS.SIX}`),
        Markup.button.callback('×', `cal ${OPTIONS.MULTIPLY}`),
        Markup.button.callback('÷', `cal ${OPTIONS.DIVIDE}`)
    ],
    [
        Markup.button.callback('1', `cal ${OPTIONS.ONE}`),
        Markup.button.callback('2', `cal ${OPTIONS.TWO}`),
        Markup.button.callback('3', `cal ${OPTIONS.THREE}`),
        Markup.button.callback('+', `cal ${OPTIONS.PLUS}`),
        Markup.button.callback('-', `cal ${OPTIONS.MINUS}`)
    ],
    [
        Markup.button.callback('0', `cal ${OPTIONS.ZERO}`),
        Markup.button.callback('.', `cal ${OPTIONS.SHIFT}`),
        Markup.button.callback('×10ˣ', 'cal -1'),
        Markup.button.callback('ANS', `cal ${OPTIONS.ANSWER}`),
        Markup.button.callback('=', `cal ${OPTIONS.EQUAL}`)
    ]
]);

let renderer: string = '';
let answer: string = '';

function Calculator(ctx: Context): void {
    //const args: string[] = ctx.args;
    //eval(args.join(' '))
    ctx.reply('test', KEYBOARD);
}

function CalculatorCallback(): void {
    bot.action(/cal (40|[1-3][0-9]|[0-9]|)/, (ctx) => {
        const option: OPTIONS = parseInt(ctx.match[1]);

        if (option >= 0 && option <= 9) {
            renderer += option.toString();
        } else {
            const ans = eval(renderer);

            switch (option) {
                case OPTIONS.SHIFT:
                    break;
                case OPTIONS.ALPHA:
                    break;
                case OPTIONS.UP:
                    break;
                case OPTIONS.MENU:
                    break;
                case OPTIONS.ON:
                    break;
                case OPTIONS.OPTION:
                    break;
                case OPTIONS.CALCULATE:
                    break;
                case OPTIONS.LEFT:
                    break;
                case OPTIONS.RIGHT:
                    break;
                case OPTIONS.ALGEBRA:
                    break;
                case OPTIONS.DOWN:
                    break;
                case OPTIONS.SQUARE_ROOT:
                    break;
                case OPTIONS.POWER_OF_TWO:
                    break;
                case OPTIONS.POWER:
                    break;
                case OPTIONS.LOGARITHMS:
                    break;
                case OPTIONS.NATURAL_LOGARITHM:
                    break;
                case OPTIONS.NEGATIVE:
                    break;
                case OPTIONS.POWER_OF_NEGATIVE_ONE:
                    break;
                case OPTIONS.SINE:
                    break;
                case OPTIONS.COSINE:
                    break;
                case OPTIONS.TANGENT:
                    break;
                case OPTIONS.LEFT_PARENTHESIS:
                    break;
                case OPTIONS.RIGHT_PARENTHESIS:
                    break;
                case OPTIONS.DELETE:
                    break;
                case OPTIONS.ALL_CLEAR:
                    break;
                case OPTIONS.MULTIPLY:
                    renderer += '*';
                    break;
                case OPTIONS.DIVIDE:
                    renderer += '/';
                    break;
                case OPTIONS.PLUS:
                    renderer += '+';
                    break;
                case OPTIONS.MINUS:
                    renderer += '-';
                    break;
                case OPTIONS.ANSWER:
                    renderer += 'answer';
                    break;
                case OPTIONS.EQUAL:
                    if (ans !== undefined) {
                        answer = ans;
                    }
                    break;
            }
        }

        ctx.editMessageText(`${renderer}\n${answer}`, KEYBOARD);
    });
}

export { Calculator, CalculatorCallback };