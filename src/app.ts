#!/usr/bin/env node

import { getData, parseData } from "./dataService.js";

try {
    const repos = await getData();
    const dataToReturn =  await parseData(repos);
    if (dataToReturn) console.log(dataToReturn);
} catch (e:any) {
    console.log(e);
}