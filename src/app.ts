#!/usr/bin/env node

import { getData, parseData } from "./dataService.js";

import cliTool from "./cliService.js";

try {
    const args = cliTool.opts();
    const repos = await getData(args);
    if (repos) {
        const dataToReturn =  await parseData(repos);
        dataToReturn?.forEach(element => console.log(
            {
                "Name": element.full_name,
                "Description": element.description,
                "URL": element.html_url,
                "Language": element.language,
                "Started": element.created_at,
                "Stars": element.stargazers_count
            }
        ));
    }
} catch (e:any) {
    console.log(e);
}