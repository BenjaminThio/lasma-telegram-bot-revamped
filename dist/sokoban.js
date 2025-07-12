const HEIGHT = 8;
const WIDTH = 10;
const BACKGROUND = '⬜️';
function RenderMap() {
    let renderer = '';
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; y++) {
            renderer += BACKGROUND;
        }
        renderer += '\n';
    }
    return renderer;
}
export function Sokoban(ctx) {
    ctx.reply(RenderMap());
}
//# sourceMappingURL=sokoban.js.map