import { Context } from "telegraf";

function test(ctx: Context) {
    const date: Date = new Date();

    ctx.reply(date.toLocaleDateString());
}

function Time(ctx: Context) {
    const date: Date = new Date();

    ctx.reply(date.toLocaleTimeString());
}

export { test, Time };