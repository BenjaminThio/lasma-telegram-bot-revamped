import fs from 'fs';
;
;
function searchInCorrespondingDatabase(word, firstLetter) {
    const filename = /[a-z]/.test(firstLetter) ? firstLetter + '.json' : '#.json';
    const filePath = `./dictionary/data/${filename}`;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return data[word];
}
function search(searchText) {
    const word = searchText.trim().toLowerCase();
    const firstLetter = word.charAt(0);
    return searchInCorrespondingDatabase(word, firstLetter);
}
async function searchAsync(searchText) {
    return new Promise((resolve) => {
        resolve(search(searchText));
    });
}
function listAllWords() {
    const result = [];
    const dirs = fs.readdirSync('./data', 'utf-8');
    dirs.map((dir) => {
        const raw = fs.readFileSync(`./data/${dir}`, 'utf-8');
        const data = JSON.parse(raw);
        result.push(...Object.keys(data));
    });
    return result;
}
async function listAllWordsAsync() {
    return new Promise((resolve) => {
        resolve(listAllWords());
    });
}
function isExist(searchText) {
    const word = searchText.trim().toLowerCase();
    const firstLetter = word.charAt(0);
    const filename = /[a-z]/.test(firstLetter) ? firstLetter + '.json' : '#.json';
    const filePath = `./data/${filename}`;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return Boolean(data[word]);
}
async function isExistAsync(searchText) {
    return new Promise((resolve) => {
        resolve(isExist(searchText));
    });
}
export { search, searchAsync, listAllWords, listAllWordsAsync, isExist, isExistAsync };
//# sourceMappingURL=index.js.map