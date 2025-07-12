import { search, type Word, type Definition } from '@dictionary/index.js';
import { Context } from 'telegraf';

interface DefContext extends Context {
    args: string[]
}

function Dict(ctx: DefContext) {
    const args: string[] = ctx.args;

    if (args.length > 0) {
        const word: Word | undefined = search(args[0]);

        if (word !== undefined) {
            const definitions: Definition[] = word.definitions;

            console.log(definitions);
            ctx.reply(definitions.map((value: Definition) => value.meaning).join('\n'));
        }
    }
}

export { Dict };