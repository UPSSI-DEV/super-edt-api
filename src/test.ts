import * as data from "./res/events.json";

interface Module {
    code: string;
    nom: string;
}

let tab_modules: Module[] = [];
const regex = /[A-Z]{5}(\d)[A-Z]\d/gm;
const find = false;

for (let i = 0; i < data.length; i++) {
    const event = data[i];

    if (event.summary.match(regex)) {
        console.log(event.summary.match(regex));
    }
}
