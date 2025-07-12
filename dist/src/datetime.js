function test(ctx) {
    const date = new Date();
    ctx.reply(date.toLocaleDateString());
}
function Time(ctx) {
    const date = new Date();
    ctx.reply(date.toLocaleTimeString());
}
export { test, Time };
//# sourceMappingURL=datetime.js.map