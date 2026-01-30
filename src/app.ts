#!/usr/bin/env node

import axios, { type AxiosResponse } from "axios";
import dotenv from "dotenv";
import type { Repo } from "./types.js";

dotenv.config();

const getData = async ():Promise<AxiosResponse<any, any, {}>> => {
    const data = await axios({
        method:"get",
        url: "https://api.github.com/repositories"
    })
    return data;
};

const parseData = (repos:AxiosResponse<any, any, {}>):Array<Repo> => {
    return repos.data.map((repo:Repo): Array<Repo> | void => {
        repo.full_name,
        repo.description,  
        repo.url,
        repo.stargazers_url,
        repo.languages_url
    })
};

try {
    const repos = await getData();
    const dataToReturn = parseData(repos);

    console.log(dataToReturn);
} catch (e:any) {
    if (e.status === 403) {
        console.log("You're blocked for a while yo");
    }
    if (e.status === 404) {
        console.log("Can't find that");
    }
}