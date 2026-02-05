#!/usr/bin/env node

import { getData, parseData } from "./dataService.js";

import cliTool from "./cliService.js";

try {
    const args = cliTool.opts();
    const repos = await getData(args);
    const dataToReturn =  await parseData(repos);
    if (dataToReturn) console.log(dataToReturn.length);
} catch (e:any) {
    console.log(e);
}