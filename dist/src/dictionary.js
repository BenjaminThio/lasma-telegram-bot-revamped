import { search } from '@dictionary/index.js';
function Dict(ctx) {
    const args = ctx.args;
    if (args.length > 0) {
        const word = search(args[0]);
        if (word !== undefined) {
            const definitions = word.definitions;
            console.log(definitions);
            ctx.reply(definitions.map((value) => value.meaning).join('\n'));
        }
    }
}
export { Dict };
//# sourceMappingURL=dictionary.js.map